"use client";

import { setCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function LoginForm() {

  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json());

    if (response.token) {
      setCookie('token', response.token);
      setCookie('username', e.target.username.value);
      router.refresh();
    }
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-800"
        >
          Username
        </label>
        <input
          name="username"
          type="username"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-800"
        >
          Password
        </label>
        <input
          name="password"
          type="password"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <Link
        href="/forget"
        className="text-xs text-blue-600 hover:underline"
      >
        Forget Password?
      </Link>
      <div className="mt-2">
        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          Login
        </button>
      </div>
    </form>
  )
}
