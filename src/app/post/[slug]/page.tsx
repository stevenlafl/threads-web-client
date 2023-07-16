"use client";

import Feed from '@/app/Feed';
import { useSelector } from 'react-redux';
import { selectAuthState, selectToken } from '@/store/authSlice';
import SignUp from '@/app/SignUp';

export default function Page({ params }: { params: { slug: string } }) {

  const token = useSelector(selectToken);
  const loggedIn = useSelector(selectAuthState);

  const user_id = params.slug;

  const post_id = params.slug;

  if (loggedIn) {

    return (
      <>
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="px-4 py-2 text-xl font-semibold text-white">
              Thread
            </h2>
          </div>
        </div>
        <Feed token={token} post_id={post_id}/>
      </>
    )
  }

  return (
    <SignUp />
  )
}
