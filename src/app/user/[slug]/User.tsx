"use client";

import { useState } from 'react';
import UserItem from './UserItem';
import Feed from '@/app/Feed';
import useFetcher from '@/hooks/useFetcher';

import { useQuery } from '@tanstack/react-query';

export default function User(props: any) {
  const user_id = props.user_id;
  const my_user_id = props.my_user_id;

  const [isFollowing, setIsFollowing] = useState(false);
  const [isMuting, setIsMuting] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  
  const [feedLoaded, setFeedLoaded] = useState(false);

  const fetcher = useFetcher();

  const {data, status, error} = useQuery(
    ['user', user_id],
    async () => {
      return fetcher('/api/user/' + user_id);
    },
    {
      staleTime: 1000 * 60 * 30 // 10 minutes
    }
  );

  return (
    <>
      {status === 'loading' ? (
        <p className="text-white text-center">Loading...</p>
      ) : status === 'error' ? (
        <span className="text-white">Error: {(error as any).message}</span>
      ) : (
        <UserItem user={data.user} my_user_id={my_user_id} following={isFollowing} muting={isMuting} blocking={isBlocking} feedLoaded={feedLoaded} setFollowing={setIsFollowing} setMuting={setIsMuting} setBlocking={setIsBlocking} />
      )}
      <Feed user_id={user_id} setFollowing={setIsFollowing} setMuting={setIsMuting} setBlocking={setIsBlocking} setFeedLoaded={setFeedLoaded} />
    </>
  )
}
