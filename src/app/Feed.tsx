"use client";

import { setCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import FeedItem from './FeedItem';


type FeedState = {
  feed: JSX.Element[];
  loaded: boolean;
}

export default function Feed(props: any) {
  const token = props.token;
  const router = useRouter();

  const [state, setState] = useState(
    {
      feed: [],
      loaded: false,
    } as FeedState
  );

  useEffect(() => {
    if (state.loaded == false) {
      fetch('/api/feed', {
        method: 'POST',
        body: JSON.stringify({
          token: token,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json()).then((res) => {

        state.loaded = true;
        state.feed = [];
        
        for (let item of res.items) {
          state.feed.push(
            <FeedItem key={item.id} item={item}/>
          )
        }

        setState({...state});
      });
    }
  });

  return (
    <div>{state.feed}</div>
  )
}
