"use client";

import { setCookie } from 'cookies-next';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

export default function PostItem(props: any) {
  const token = props.token;
  const item = props.item;

  const hasChildren = props.hasChildren;
  const hasParent = props.hasParent;
  const levels = props.levels;

  console.log(hasChildren, hasParent, levels)

  console.log(item);
  let post = item.posts[0];
  let id = (post.id as string).split('_')[0];
  let user = post.user;

  const isRepost = post.text_post_app_info && post.text_post_app_info.share_info && post.text_post_app_info.share_info.reposted_post;

  let repostUser = null;
  if (isRepost) {
    repostUser = user;
    
    post = post.text_post_app_info.share_info.reposted_post;
    user = post.user;
  }

  const images = (post.image_versions2 && post.image_versions2.candidates) ? post.image_versions2.candidates : [];
  const videos = (post.video_versions) ? post.video_versions : [];

  console.log(post);
  // convert unix timestamp to readable time
  const date = new Date(post.taken_at * 1000);

  async function likePost(e: any) {
    const response = await fetch('/api/like', {
      method: 'POST',
      body: JSON.stringify({
        token: token,
        post_id: id,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json());
  }

  return (
    <>
    <div className={"flex flex-shrink-0 pb-0 " + ((hasParent) ? "px-8 py-4" : "p-4")}>
      <div className="flex-shrink-0 group block">
        {(isRepost) && 
          <div className="text-sm text-gray-500 pb-2">
            {repostUser.username} reposted
          </div>
        }
        {(hasParent) && 
          <div className="text-sm text-gray-500 pb-2">
            {user.username} replied
          </div>
        }
        <div className="flex items-center">
          <div>
            <Image className="inline-block h-10 w-10 rounded-full" src={user.profile_pic_url} width="100" height="100" alt="" />
          </div>
          <div className="ml-2">
            <p className="text-base leading-6 font-medium text-white">
              {user.full_name}
              <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150 pl-1">
                @{user.username} - <ReactTimeAgo date={date} locale="en-US" />
              </span>
            </p>
          </div>
        </div>
      </div>
  </div>
  <div className={(hasParent) ? "px-20" : "px-16"}>
    <Link href={"/post/" + id} target="_blank">
      <p className="text-base width-auto font-medium text-white flex-shrink">
        {(post.caption) &&
          post.caption.text
        }
      </p>
    </Link>
      <p className="text-base width-auto font-medium text-white flex-shrink">
        {((videos === null || videos.length === 0 )&& images.length > 0 && !images[0].url.includes('null.jpg')) &&
          <Link href={images[0].url} target="_blank">
            <Image className="mt-4" src={images[0].url} width={images[0].width} height={images[0].height} alt={''} />
          </Link>
        }
        {(videos !== null && videos.length > 0) &&
          <video className="mt-4" controls loop>
            <source src={"/api/video/" + encodeURIComponent(videos[0].url)} width={videos[0].width} height={videos[0].height} />
          </video>
        }
      </p>
      <div className="flex">
          <div className="w-full">
              
              <div className="flex items-center">
                  <div className="flex-1 text-center">
                    <Link href={"/post/" + id} target="_blank" className="mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300">
                        <svg className="text-center h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        { post.text_post_app_info && 
                          <span>
                            { post.text_post_app_info.direct_reply_count }
                          </span>
                        }
                    </Link>
                  </div>

                  <div className="flex-1 text-center py-2 m-2">
                      <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300">
                          <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                      </a>
                  </div>

                  <div className="flex-1 text-center py-2 m-2">
                      <a href="#" className="mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300">
                          {(post.has_liked) ?
                            <svg className="text-center h-7 w-6" fill="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            :
                            <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                          }
                          <span>
                            {post.like_count}
                          </span>
                      </a>
                  </div>

                  <div className="flex-1 text-center py-2 m-2">
                      <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300">
                          <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  </a>
                  </div>
                  <div className="flex-1 text-center py-2 m-2">
                      <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300">
                          <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
                  </a>
                  </div>
                  <div className="flex-1 text-center py-2 m-2">
                      <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300">
                          <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  </a>
                  </div>
              </div>
          </div>

      
      </div>
      
    </div>
    {/* <textarea defaultValue={JSON.stringify(post, null, 2)}></textarea> */}
    {hasChildren ?
      <hr className="border-gray-800"></hr>
      :
      <hr className="border-gray-600"></hr>
    }
    </>
  )

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg mb-10">
      <div className="px-6 py-4">
        {(isRepost) && 
          <div className="text-sm text-gray-500">
            {repostUser.username} reposted
          </div>
        }
        <div className="font-bold text-xl mb-2">
          {user.username}
        </div>
        <p className="text-gray-700 text-base">
          {(post.caption) &&
            post.caption.text
          }
        </p>
      </div>
      {(images.length > 0 && !images[0].url.includes('null.jpg')) &&
        <Image className="mt-4" src={images[0].url} width={images[0].width} height={images[0].height} alt={''} />
      }
    </div>
  )
}
