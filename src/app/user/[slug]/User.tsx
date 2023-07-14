"use client";

import { useEffect, useState } from 'react';
import UserItem from './UserItem';
import Feed from '@/app/Feed';

export default function User(props: any) {
  const token = props.token;
  const user_id = props.user_id;
  const my_user_id = props.my_user_id;

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({} as any);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isMuting, setIsMuting] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  
  const [feedLoaded, setFeedLoaded] = useState(false);

  const fetchData = async () => {

    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/user/' + user_id, {
        method: 'POST',
        body: JSON.stringify({
          token: token,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();

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
      <UserItem token={token} user={user} my_user_id={my_user_id} following={isFollowing} muting={isMuting} blocking={isBlocking} feedLoaded={feedLoaded} setFollowing={setIsFollowing} setMuting={setIsMuting} setBlocking={setIsBlocking} />
      <Feed token={token} user_id={user_id} setFollowing={setIsFollowing} setMuting={setIsMuting} setBlocking={setIsBlocking} setFeedLoaded={setFeedLoaded} />
    </>
  )
}
