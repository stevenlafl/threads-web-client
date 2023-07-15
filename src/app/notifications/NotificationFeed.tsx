"use client";

import { useState } from 'react';
import NotificationItem from './NotificationItem';


import useFetcher from '@/hooks/useFetcher';
import { InView } from 'react-intersection-observer'
import {
  useInfiniteQuery,
} from '@tanstack/react-query'

export default function Page(props: any) {

  let token = props.token;

  const [nextMaxId, setNextMaxId] = useState(null as string | null);
  const [firstRecordTime, setFirstRecordTime] = useState(null as string | null);

  const fetcher = useFetcher();

  const {
    status,
    data,
    error,
    hasNextPage,
    fetchNextPage,
    refetch
  } = useInfiniteQuery(
    ['notifications'],
    async ({ pageParam = {
      max_id: null,
      firstRecordTime: null,
    }}) => {
      const response = await fetcher('/api/notifications', {
        max_id: pageParam.max_id,
        firstRecordTime: pageParam.firstRecordTime
      });

      if (response.new_stories.length > 0) {
        await fetcher('/api/clearnotifications');
      }

      // Clone
      let newNot = JSON.parse(JSON.stringify(response));
      newNot.old_stories = [...response.new_stories, ...response.old_stories]; 
      newNot.new_stories = [];

      setNextMaxId(response.next_max_id);
      setFirstRecordTime(response.pagination_first_record_timestamp)

      const newItems: {
        items: any[],
        nextPage: string | null,
        firstRecordTime: number | null
      } = {
        items: [],
        nextPage: null,
        firstRecordTime: null,
      };

      for (let item of response.new_stories) {
        item.new = true;
        newItems.items.push(item);
      }

      for (let item of response.old_stories) {
        item.new = false;
        newItems.items.push(item);
      }

      console.log(newItems);

      return newItems;
    },
    {
      getNextPageParam: (lastPage) => {
        return false;

        // if (lastPage.nextPage === null) {
        //   return false;
        // }

        // return {
        //   max_id: lastPage.nextPage,
        //   firstRecordTime: firstRecordTime,
        // };
      },
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 5, // 5 minutes
      staleTime: 1000 * 60 * 4, // 4 minutes
    },
  )

  return (
    <>
      <button className="text-white float-right -mt-16 relative z-10" onClick={() => refetch({
        refetchPage: (_: any, index: any) => index === 0,
      })}>
        <svg className="h-10 w-10 text-white mr-5 mt-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      <div className="p-6 pt-0">
        {status === 'loading' ? (
          <p className="text-white text-center">Loading...</p>
        ) : status === 'error' ? (
          <span className="text-white">Error: {(error as any).message}</span>
        ) : (
          <>
            { data?.pages.map((page, i) => (
              <>
                {page.items.map((item: any) => (
                  <NotificationItem key={item.pk} item={item} new={item.new} />
                ))}
              </>
            ))}
          </>
        )}
      </div>

      <InView as="div" initialInView onChange={inView => {
        if (inView && hasNextPage) {
          fetchNextPage({
            pageParam: {
              max_id: null,
              firstRecordTime: null,
            },
          })
        }
      }}/>
    </>
  )
}
