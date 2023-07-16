"use client";

import SearchItem from './SearchItem';

import useFetcher from '@/hooks/useFetcher';
import {
  useInfiniteQuery,
} from '@tanstack/react-query'
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRouteChange } from 'nextjs13-router-events';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Page(props: any) {
  const searchParams = useSearchParams()

  const fetcher = useFetcher();
  const [isBlocked, setIsBlocked] = useState(false);

  useRouteChange({
    onRouteChangeStart: () => {
      setIsBlocked(true);
    },
    onRouteChangeComplete: () => {
      setIsBlocked(false);
    }
  });

  useInfiniteScroll(() => {
    if (status === 'success' && !isFetching && hasNextPage && !isBlocked) {
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
    refetch
  } = useInfiniteQuery(
    ['search', [ searchParams?.get('query') ]],
    async ({ pageParam = null}) => {

      return await fetcher('/api/search', {
        query: searchParams?.get('query'),
        count: pageParam,
      });
    },
    {
      getNextPageParam: (lastPage) => {
        return false;
      },
      keepPreviousData: true,
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
            { data?.pages.map((page: any, i) => (
              <>
                {page?.users.map((item: any) => (
                  <SearchItem key={item.pk} item={item} />
                ))}
              </>
            ))}
          </>
        )}
      </div>
    </>
  )
}
