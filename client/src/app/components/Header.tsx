"use client"
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { magic } from '../lib/magic';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter()
  const { user } = useContext(UserContext);

  const logout = async () => {
    const result = await magic?.user.logout();
    if (result === true) {
      router.push("/login")
    }
  }
  return (
    <nav className=" text-[#6851ff] p-2">
      {user ?
        <div className="flex justify-between">
          <ul className="flex gap-4">
            <li>
              <button onClick={() => router.push('/profile')}>
                Profile
              </button>
            </li>
            <li>
              <button onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        :
        <p>Login</p>
      }
    </nav>
  )
};

export default Header;