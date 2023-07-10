"use client";

import { setCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FeedItem from './FeedItem';

export default function Feed(props: any) {
  const token = props.token;

  const [items, setItems] = useState([] as JSX.Element[]);
  const [nextMaxId, setNextMaxId] = useState(null as string | null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleScroll = () =>  {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    
    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/feed', {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          max_id: nextMaxId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();

      setNextMaxId(data.next_max_id);

      const newItems = [] as JSX.Element[];
      for (let item of data.items) {
        newItems.push(
          <FeedItem key={item.id} item={item}/>
        )
      }
  
      setItems(prevItems => [...prevItems, ...newItems]);
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div>{items}</div>
  )
}
