"use client";

import { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import PostForm from './PostForm';
import ScrollToTop from 'react-scroll-to-top';

import useFetcher from '@/hooks/useFetcher';
import {
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query'
import useInfiniteScroll from '@/hooks/infiniteScroll';

export default function Feed(props: any) {
  const token = props.token;
  const post_id = props.post_id;
  const user_id = props.user_id;
  
  const setFollowing = props.setFollowing;
  const setMuting = props.setMuting;
  const setBlocking = props.setBlocking;
  const setFeedLoaded = props.setFeedLoaded;

  const [threadData, setThreadData] = useState(null as any);

  const queryClient = useQueryClient()
  const fetcher = useFetcher();

  useInfiniteScroll(() => {
    if (status === 'success' && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  });

  const {
    status,
    data,
    error,
    hasNextPage,
    isFetching,
    fetchNextPage,
    refetch,
    remove,
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

        apiData.nextPage = apiData.paging_tokens.downwards;
      }
      else {
        apiData = await fetcher('/api/feed', {
          max_id: pageParam
        });
        
        apiData.nextPage = apiData.next_max_id;
      }

      return apiData;
    },
    {
      getPreviousPageParam: (firstPage) => null,
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      keepPreviousData: true,
    },
  )

  useEffect( () => {
    if (status == 'success') {
      for (let page of data?.pages) {

        if (post_id && page.containing_thread) {
          setThreadData(page);
        }

        for (let item of page.items) {
          for (const post of item.posts) {
            if (user_id && post.user.pk == user_id && post.user.friendship_status) {
              setFollowing(post.user.friendship_status.following);
              setMuting(post.user.friendship_status.muting);
              setBlocking(post.user.friendship_status.blocking);
              break;
            }
          }
        }
      }

      if (setFeedLoaded) {
        setFeedLoaded(true);
      }
    }
  }, [status, post_id, data, setBlocking, setFeedLoaded, setFollowing, setMuting, user_id]);

  const addPost = (newPost: any) => {

    // Create a query key based on your existing key
    const queryKey = ['feed', { user_id: user_id, post_id: post_id }];

    // Use the setQueryData method to manipulate & update the data
    queryClient.setQueryData(queryKey, (oldData: any) => {
      // We will add the newPost into the first page 
      // (you may need to adjust this based on your needs).
      let updatedData = JSON.parse(JSON.stringify(oldData));

      // Add check if pages exist 
      if (updatedData.pages) {

        if (threadData) {
          // Make sure newPost gets added on the top of the list in page 1
          updatedData.pages[0].items.unshift({
            threaded_items: [threadData, newPost],
            posts: [threadData, newPost]
          });
        }
        else {
          updatedData.pages[0].items.unshift({
            threaded_items: [newPost],
            posts: [newPost]
          });
        }
      }

      console.log(updatedData);

      return updatedData;
    })
  }

  return (
    <>
      {(post_id) &&
        <div>
          { (status === 'success' && threadData !== null) &&
              <FeedItem key={threadData.containing_thread.id} token={token} item={threadData.containing_thread} />
          }
        </div>
      }
      <div>
        {!user_id &&
          <PostForm token={token} addPost={addPost} post_id={post_id} />
        }
        <hr className="border-b-gray-800" />
      </div>
        <button className="text-white float-right" onClick={() => {
          remove();
          refetch({
            refetchPage: (_: any, index: any) => index === 0,
          });
        }}>
          <svg className="h-10 w-10 text-white mr-5 mt-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
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
      </div>
    </>
  )

}
