"use client";

import Feed from '@/app/Feed';
import { useSelector } from 'react-redux';
import { selectAuthState, selectToken } from '@/store/authSlice';
import SignUp from '../SignUp';
import NotificationFeed from './NotificationFeed';

export default function Page({ params }: { params: { slug: string } }) {

  const token = useSelector(selectToken);
  const loggedIn = useSelector(selectAuthState);

  if (loggedIn && token) {

    return (
      <>
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="px-4 py-2 text-xl font-semibold text-white">
              Notifications
            </h2>
          </div>
        </div>
        <NotificationFeed token={token} />
      </>
    )
  }

  return (
    <SignUp />
  )
}
