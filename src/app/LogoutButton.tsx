"use client";

import { useQueryClient } from '@tanstack/react-query';
import { setAuthState } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function LogoutButton() {

  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSubmit(e: any) {
    e.preventDefault();

    queryClient.clear();
    dispatch(setAuthState(false));

    router.refresh();
  }

  return (
    <div className="text-gray-300 ml-7">
      <button type="submit" className="bg-[#343638] hover:bg-gray-600 text-white font-bold pb-1 px-4 rounded-full" onClick={handleSubmit}>
        Log out
      </button>
    </div>
  )
}
