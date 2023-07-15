"use client";

import { useState } from 'react';
import FeedItem from './FeedItem';
import PostForm from './PostForm';
import { selectFeed, selectLastFeed, setFeed, setLastFeed } from '@/store/prevSlice';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from 'react-scroll-to-top';

import useFetcher from '@/hooks/useFetcher';
import { InView } from 'react-intersection-observer'
import {
  useInfiniteQuery,
} from '@tanstack/react-query'

export default function Feed(props: any) {
  const token = props.token;
  const post_id = props.post_id;
  const user_id = props.user_id;
  
  const setFollowing = props.setFollowing;
  const setMuting = props.setMuting;
  const setBlocking = props.setBlocking;
  const setFeedLoaded = props.setFeedLoaded;

  const [thread, setThread] = useState(<></> as JSX.Element);
  const [threadData, setThreadData] = useState([] as any[]);
  const [items, setItems] = useState([] as JSX.Element[]);

  const fetcher = useFetcher();

  const x = useInfiniteQuery([], async ({ pageParam = null }) => {},{} as any);

  const {
    status,
    data,
    error,
    fetchNextPage,
    refetch,
    a,
  } = useInfiniteQuery(
    ['feed', { user_id: user_id, post_id: post_id }],
    async ({ pageParam = null }) => {
      let apiData = {} as any;

      if (user_id) {
        apiData = await fetcher('/api/feed/' + user_id, {
          max_id: pageParam == 'NONE' ? '' : pageParam
        });
        apiData.items = apiData.threads;
        apiData.nextPage = apiData.next_max_id;
      }
      else if (post_id) {
        apiData = await fetcher('/api/post/' + post_id, {
          max_id: pageParam
        });
        apiData.items = apiData.reply_threads;

        setThreadData(apiData.containing_thread.thread_items[apiData.containing_thread.thread_items.length - 1].post);

        if (apiData.containing_thread) {
          setThread(
            <FeedItem key={apiData.containing_thread.id} token={token} item={apiData.containing_thread} />
          )
        }

        apiData.nextPage = apiData.paging_tokens.downwards;
      }
      else {
        apiData = await fetcher('/api/feed', {
          max_id: pageParam
        });
        
        apiData.nextPage = apiData.next_max_id;
      }

      for (let item of apiData.items) {
        for (const post of item.posts) {
          if (user_id && post.user.pk == user_id && post.user.friendship_status) {
            setFollowing(post.user.friendship_status.following);
            setMuting(post.user.friendship_status.muting);
            setBlocking(post.user.friendship_status.blocking);
            break;
          }
        }
      }

      if (setFeedLoaded) {
        setFeedLoaded(true);
      }

      return apiData;
    },
    {
      getPreviousPageParam: (firstPage) => null,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 5, // 5 minutes
      staleTime: 1000 * 60 * 4, // 4 minutes
    },
  )

  const addPost = (item: any) => {
    const newPost = <FeedItem key={item.id} token={token} item={{ posts: [item] }} />
    setItems(prevItems => [newPost, ...prevItems])
    let newFeed = JSON.parse(JSON.stringify(prevFeed));

    console.log([threadData, item]);
    newFeed.items = [{
      threaded_items: [threadData, item],
      posts: [threadData, item]
    },
    ...prevFeed.items];
    dispatch(setFeed(newFeed));
  }

  // useEffect(() => {
  //   if (inView && status == 'success' && hasNextPage && !isFetching) {
  //     console.log(status, hasNextPage, isFetching);
  //     fetchNextPage({
  //       pageParam: null,
  //     })
  //   }
  // }, [inView])

  return (
    <>
      {(post_id) &&
        <div>
          {thread}
        </div>
      }
      <div>
        {!user_id &&
          <PostForm token={token} addPost={addPost} post_id={post_id} />
        }
        <hr className="border-b-gray-800" />
      </div>
      {(!post_id) &&
        <button className="text-white float-right" onClick={() => refetch({
          refetchPage: (_: any, index: any) => index === 0,
        })}>
          <svg className="h-10 w-10 text-white mr-5 mt-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      }
      <div>
        {status === 'loading' ? (
          <p className="text-white text-center">Loading...</p>
        ) : status === 'error' ? (
          <span className="text-white">Error: {(error as any).message}</span>
        ) : (
          <>
            { data?.pages.map((page, i) => (
              <>
                {page.items.map((item: any) => (
                  <FeedItem key={item.id} token={token} item={item} />
                ))}
              </>
            ))}
          </>
        )}

        <ScrollToTop
          smooth
          viewBox="0 0 256 256"
          svgPath="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-101.66a8,8,0,0,1-11.32,11.32L136,107.31V168a8,8,0,0,1-16,0V107.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0Z"
          className='scroll-to-top flex items-center justify-center'
        />

        <InView as="div" initialInView onChange={inView => {
          if (inView) {
            fetchNextPage({
              pageParam: null,
            })
          }
        }}/>
      </div>
    </>
  )

}
