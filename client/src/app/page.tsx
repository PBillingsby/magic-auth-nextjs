"use client"
import Image from 'next/image'
import { magic } from './lib/magic';
import { useContext, useEffect } from 'react';
import { UserContext } from "./context/UserContext"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && !user.loading) {
      router.push('/profile');
    } else {
      router.push('/login')
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      ...loading
    </main>
  )
}
