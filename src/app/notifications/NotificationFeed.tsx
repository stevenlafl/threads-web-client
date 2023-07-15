"use client";

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import NotificationItem from './NotificationItem';
import { selectLastNotifications, selectNotifications, setNotifications, setLastNotifications } from '@/store/notificationSlice';
import useFetcher from '@/hooks/useFetcher';

export default function Page(props: any) {

  let token = props.token;

  const dispatch = useDispatch();

  const lastFeed = useSelector(selectLastNotifications);
  const feed = useSelector(selectNotifications);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [nextMaxId, setNextMaxId] = useState(null as string | null);
  const [firstRecordTime, setFirstRecordTime] = useState(null as string | null);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([] as JSX.Element[]);

  const fetcher = useFetcher();

  const fetchData = async () => {

    if (isLoading) return;
    setIsLoading(true);

    try {

      let fetchFeed = !feed || ((Date.now()/1000) - lastFeed) > 60*5;
      //let fetchFeed = true;

      let response = {} as any;
      if (!feed || fetchFeed || nextMaxId) {
        response = await fetcher('/api/notifications', {
          max_id: nextMaxId,
          firstRecordTime: firstRecordTime
        });

        if (response.new_stories.length > 0) {
          await fetcher('/api/clearnotifications');
        }

        // Clone
        let newNot = JSON.parse(JSON.stringify(response));
        newNot.old_stories = [...response.new_stories, ...response.old_stories]; 
        newNot.new_stories = [];
        dispatch(setNotifications(newNot));
        dispatch(setLastNotifications(Date.now()/1000));
      }
      else {
        response = feed;
      }

      setNextMaxId(response.next_max_id);
      setFirstRecordTime(response.pagination_first_record_timestamp)

      const newItems = [] as JSX.Element[];
      for (let item of response.new_stories) {
        let exists = items.reduce((acc, cur) => {
          if (cur.key == item.pk) return true;
          return acc;
        }, false);

        if (!exists) {
          newItems.push(
            <NotificationItem key={item.pk} item={item} new={true} />
          )
        }
      }

      for (let item of response.old_stories) {
        let exists = items.reduce((acc, cur) => {
          if (cur.key == item.pk) return true;
          return acc;
        }, false);

        if (!exists) {
          newItems.push(
            <NotificationItem key={item.pk} item={item} new={false} />
          )
        }
      }
  
      setItems(prevItems => [...prevItems, ...newItems]);

      //console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleScroll = () =>  {
    if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || isLoading) {
      return;
    }

    if (nextMaxId === null || nextMaxId === undefined) {
      return;
    }
    
    //fetchData();
  };

  const handleRefreshBtn = (e: any) => {
    e.preventDefault();

    setItems([]);
    dispatch(setLastNotifications(0));
  };

  useEffect(() => {
    if (!isFirstLoad && lastFeed === 0 && items.length === 0) {
      fetchData();
    }
  }, [lastFeed])

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      fetchData();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [isLoading, nextMaxId]);

  return (
    <>
      <button className="text-white float-right -mt-16 relative z-10" onClick={handleRefreshBtn}>
        <svg className="h-10 w-10 text-white mr-5 mt-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
      <div className="p-6 pt-0">
        {items}
      </div>
    </>
  )
}
