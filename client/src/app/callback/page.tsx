"use client"
import { useEffect, useContext, useState } from 'react';
import { magic } from '../lib/magic';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';
import { useRouter } from 'next/navigation'
import { MagicUserMetadata } from 'magic-sdk';

const Callback = (props: any) => {
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);
  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let provider = new URLSearchParams(window.location.search).get('provider');
      provider ? finishSocialLogin() : finishEmailRedirectLogin();
    }
  }, []);

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async () => {
    let result = await magic?.oauth?.getRedirectResult();
    authenticateWithServer(result.magic.idToken);
  };

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    let magicCredential: string | null = searchParams.get('magic_credential');

    if (typeof window !== 'undefined' && magicCredential) {
      magic?.auth.loginWithCredential().then((didToken) => authenticateWithServer(didToken));
    }
  };

  // Send token to server to validate
  const authenticateWithServer = async (didToken: string) => {
    try {
      let res: Response = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });

      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        let userMetadata: MagicUserMetadata | undefined = await magic?.user.getMetadata();
        console.log("METADATA", userMetadata)
        if (userMetadata !== null && userMetadata !== undefined) {
          setUser(userMetadata);
        }
        router.push('/profile');
      }
    }
    catch (err) {
      console.log("Authentication Error: ", err)
    }
  };

  return <Loading />;
};

export default Callback;
