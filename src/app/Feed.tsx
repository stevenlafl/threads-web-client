"use client";

import { setCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import PostForm from './PostForm';

export default function Feed(props: any) {
  const token = props.token;
  const post_id = props.post_id;

  const [thread, setThread] = useState(<></> as JSX.Element);
  const [items, setItems] = useState([] as JSX.Element[]);
  const [nextMaxId, setNextMaxId] = useState(null as string | null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleScroll = () =>  {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }

    if (nextMaxId === null || nextMaxId === undefined) {
      return;
    }
    
    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);
  
    try {
      let data = {} as any;
      if (post_id) {
        const response = await fetch('/api/post/' + post_id, {
          method: 'POST',
          body: JSON.stringify({
            token: token,
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        data = await response.json();

        data.items = data.reply_threads;

        setThread(
          <FeedItem key={data.containing_thread.id} item={data.containing_thread}/>
        )
        
        setNextMaxId(data.paging_tokens.downwards);
      }
      else {
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
        data = await response.json();
        
        setNextMaxId(data.next_max_id);
      }

      const newItems = [] as JSX.Element[];
      for (let item of data.items) {
        let exists = items.reduce((acc, cur) => {
          if (cur.key == item.id) return true;
          return acc;
        }, false);

        if (item.posts.length > 0 && !exists) {
          newItems.push(
            <FeedItem key={item.id} item={item}/>
          )
        }
      }
  
      setItems(prevItems => [...prevItems, ...newItems]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = (item: any) => {
    const newPost = <FeedItem key={item.id} item={{posts: [item]}}/>
    setItems(prevItems => [newPost, ...prevItems])
  }

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
    <>
      {(post_id) && 
        <div>
          {thread}
        </div>
      }
      <div>
        <PostForm token={token} addPost={addPost} post_id={post_id} />
        <hr className="border-gray-800 border-4" />
      </div>
      <div>
        {items}
      </div>
    </>
  )
}
