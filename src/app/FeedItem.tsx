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

TimeAgo.addDefaultLocale(en)

type FeedState = {
  item: any;
  loaded: boolean;
}

export default function FeedItem(props: any) {
  const posts = props.item.posts;

  return (
    <>
      {posts.map((post: any) => (
        <PostItem key={post.id} item={{posts: [post]}} />
      ))}
    </>
  )
}
