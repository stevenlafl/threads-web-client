"use client";

import { deleteCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {

  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    deleteCookie('token');
    deleteCookie('username');
    deleteCookie('user_id');
    router.refresh();
  }

  return (
    <div className="text-gray-300 w-80 p-5 pb-0 mr-16">
      <button type="submit" className="bg-[#343638] hover:bg-gray-600 text-white font-bold py-2 px-8 rounded-full float-right" onClick={handleSubmit}>
        Log out
      </button>
    </div>
  )
}
