"use client";

import { getCookie } from 'cookies-next'
import Link from 'next/link';
import LoginForm from '@/app/LoginForm';
import User from './User';
import { useEffect, useState } from 'react';
import { Metadata } from 'next';
import { selectAuthState, selectToken, selectUserId } from '@/store/authSlice';
import { useSelector } from 'react-redux';
import SignUp from '@/app/SignUp';

export default function Page({ params }: { params: { slug: string } }) {

  const token = useSelector(selectToken);
  const loggedIn = useSelector(selectAuthState);
  const my_user_id = useSelector(selectUserId);

  const user_id = params.slug;

  if (loggedIn && token) {
    return (
      <>
        <div className="flex">
          <div className="flex-1 m-2">
            <h2 className="px-4 py-2 text-xl font-semibold text-white">
              Profile
            </h2>
          </div>
        </div>
        <User token={token} user_id={user_id} my_user_id={my_user_id} />
      </>
    )
  }

  return (
    <SignUp />
  )
}
