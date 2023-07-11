import { cookies } from 'next/headers'
import Link from 'next/link';
import LoginForm from '@/app/LoginForm';
import User from './User';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { slug: string } }) {

  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('token');
  const token = tokenCookie?.value;

  const user_id = params.slug;

  return (
    <User token={token} user_id={user_id} />
  )
}
