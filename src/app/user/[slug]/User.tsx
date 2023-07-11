"use client";

import { useEffect, useState } from 'react';
import UserItem from './UserItem';

export default function User(props: any) {
  const token = props.token;
  const user_id = props.user_id;
  const my_user_id = props.my_user_id;

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({} as any);

  const fetchData = async () => {
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
    <UserItem token={token} user={user} my_user_id={my_user_id} />
  )
}
