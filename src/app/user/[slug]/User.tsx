"use client";

import { useEffect, useState } from 'react';
import UserItem from './UserItem';
import Feed from '@/app/Feed';
import useFetcher from '@/hooks/useFetcher';

export default function User(props: any) {
  const user_id = props.user_id;
  const my_user_id = props.my_user_id;

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({} as any);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isMuting, setIsMuting] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  
  const [feedLoaded, setFeedLoaded] = useState(false);

  const fetcher = useFetcher();
  
  const fetchData = async () => {

    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const data = await fetcher('/api/user/' + user_id);

      setUser(data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      fetchData();
    }
  }, []);
  return (
    <>
      <UserItem user={user} my_user_id={my_user_id} following={isFollowing} muting={isMuting} blocking={isBlocking} feedLoaded={feedLoaded} setFollowing={setIsFollowing} setMuting={setIsMuting} setBlocking={setIsBlocking} />
      <Feed user_id={user_id} setFollowing={setIsFollowing} setMuting={setIsMuting} setBlocking={setIsBlocking} setFeedLoaded={setFeedLoaded} />
    </>
  )
}
