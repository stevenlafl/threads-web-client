"use client";

import { setAuthState, setUserName, setUserId, setToken, setDeviceId } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';


export default function LoginForm() {

  const router = useRouter();
  const dispatch = useDispatch();

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
      dispatch(setDeviceId(response.deviceId));
      dispatch(setUserName(e.target.username.value));
      dispatch(setUserId(response.userId));
      dispatch(setToken(response.token));
      dispatch(setAuthState(true));
      router.refresh();
    }
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-black"
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
          className="block text-sm font-semibold text-black"
        >
          Password
        </label>
        <input
          name="password"
          type="password"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      {/* <Link
        href="/forget"
        className="text-xs text-blue-500 hover:underline"
      >
        Forget Password?
      </Link> */}
      <div className="mt-4">
        <button className="w-full px-4 py-2 tracking-wide text-white
        font-bold transition-colors duration-200 transform bg-black rounded-md hover:bg-[#292828] focus:outline-none focus:bg-[#292828]">
          Login
        </button>
      </div>
    </form>
  )
}