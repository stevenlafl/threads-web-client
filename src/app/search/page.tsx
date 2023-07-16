"use client";

import { useSelector } from 'react-redux';
import { selectAuthState, selectToken } from '@/store/authSlice';
import SignUp from '../SignUp';
import SearchFeed from './SearchFeed';

export default function Page({ params }: { params: { slug: string } }) {

  const token = useSelector(selectToken);
  const loggedIn = useSelector(selectAuthState);

  if (loggedIn) {

    return (
      <>
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="px-4 py-2 text-xl font-semibold text-white">
              Search
            </h2>
          </div>
        </div>
        <SearchFeed token={token} />
      </>
    )
  }

  return (
    <SignUp />
  )
}
