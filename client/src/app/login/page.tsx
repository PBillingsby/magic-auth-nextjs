"use client"
import { useState, useEffect, useContext } from 'react';
import { magic } from '../lib/magic';
import { UserContext } from '../context/UserContext';
import EmailForm from '../components/EmailForm';
import SocialLogins from '../components/SocialLogins';
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const { user, setUser, isLoggedIn } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false)

  // If user is already logged in, redirect to profile page
  useEffect(() => {
    setLoading(true)
    if (user && user?.issuer) {
      router.push('/profile')
    };
    setLoading(false)
  }, [user]);

  async function handleLoginWithEmail(email: string) {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered
      // Trigger Magic link to be sent to user
      let didToken = await magic?.auth.loginWithMagicLink({
        email,
        redirectURI: new URL('/callback', window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });

      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        let userMetadata = await magic?.user.getMetadata();
        if (userMetadata !== null && userMetadata !== undefined) {
          setUser(userMetadata);
        }
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log("Log In Page Error: ", error);
    }
  }

  async function handleLoginWithSocial(provider: any) {
    // await magic?.oauth.loginWithRedirect({
    //   provider,
    //   redirectURI: new URL('/callback', window.location.origin).href, // required redirect to finish social login
    // });
  }

  return (
    <>
      {loading ?
        <p className="text-center">...loading</p>
        :
        <div className='login'>
          <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
          <SocialLogins onSubmit={handleLoginWithSocial} />
        </div>
      }
      <style>{`
        .login {
          max-width: 20rem;
          margin: 40px auto 0;
          padding: 1rem;
          border: 1px solid #444;
          border-radius: 4px;
          text-align: center;
          box-shadow: 0px 0px 2px 2px #f7f7f7;
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};

export default Login;
