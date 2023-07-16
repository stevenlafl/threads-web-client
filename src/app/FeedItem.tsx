"use client";

import { setCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import PostItem from './PostItem';

export default function FeedItem(props: any) {
  const token = props.token;
  const posts = props.item.posts;

  let levels = 0;
  const postItems = posts.map((post: any) => {
    let Item: JSX.Element = <PostItem key={post.id} token={token} item={{posts: [post]}} hasChildren={(posts.length - levels) > 1} hasParent={levels > 0} levels={levels} />
    levels++;
    return Item;
  });

  return (
    <>
      { postItems }
    </>
  )
}
