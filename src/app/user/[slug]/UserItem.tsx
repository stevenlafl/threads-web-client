"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image'

export default function UserItem(props: any) {
  const token = props.token;
  const user = props.user;
  const my_user_id = props.my_user_id;

  console.log(user);

  const [isFollowing, setIsFollowing] = useState(false);

  async function followUser(e: any) {
    e.preventDefault();


  }

  return (
    <>
      {(user) && 
        <div>
          <div className="p-4">
              <div className="relative flex w-full">
                  {/* <!-- Avatar --> */}
                  <div className="flex flex-1">
                      <div className="-mt-26">
                          <div className="w-36 h-36 md rounded-full relative avatar">
                              <Image className="w-36 h-36 md rounded-full relative border-4 border-gray-900" src={user.profile_pic_url} width={144} height={144} alt="" />
                              <div className="absolute"></div>
                          </div>
                      </div>
                  </div>
                  {/* <!-- Follow Button --> */}
                  {user.pk != my_user_id &&
                    <div className="flex flex-col text-right mt-20">
                        <button className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring  rounded max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto" onClick={followUser}>
                            Follow
                        </button>
                    </div>
                  }
              </div>
      
              {/* <!-- Profile info --> */}
              <div className="space-y-1 justify-center w-full mt-3 ml-3">
                  {/* <!-- User basic--> */}
                  <div>
                      <h2 className="text-xl leading-6 font-bold text-white">
                        {user.full_name}
                        { user.is_verified && 
                          <svg className="inline-block -mt-0.5 ml-2" aria-label="Verified" color="rgb(0, 149, 246)" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fill-rule="evenodd"></path></svg>
                        }
                      </h2>
                      <p className="text-sm leading-5 font-medium text-gray-500">@{user.username}</p>
                  </div>
                  {/* <!-- Description and others --> */}
                  <div className="mt-3">
                      <p className="text-white leading-tight mb-2">{user.biography}</p>
                      <div className="text-gray-600">
                        {user.bio_links && user.bio_links.length > 0 &&
                          <span className="flex mr-2 mb-1 text-white">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 paint-icon">
                              <g>
                                <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path><path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
                              </g>
                            </svg>
                            <a href={user.bio_links[0].url} target="_blank" className="leading-5 ml-1 text-blue-400">
                              {user.bio_links[0].title ?
                                <>{user.bio_links[0].title}</>
                                :
                                <>{user.bio_links[0].url}</>
                              }
                            </a>
                          </span>
                        }
                        {user.profile_context && 
                          <span className="flex mr-2 text-white">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 paint-icon">
                              <g>
                                <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                                <circle cx="7.032" cy="8.75" r="1.285"></circle><circle cx="7.032" cy="13.156" r="1.285"></circle>
                                <circle cx="16.968" cy="8.75" r="1.285"></circle><circle cx="16.968" cy="13.156" r="1.285"></circle>
                                <circle cx="12" cy="8.75" r="1.285"></circle><circle cx="12" cy="13.156" r="1.285"></circle>
                                <circle cx="7.032" cy="17.486" r="1.285"></circle><circle cx="12" cy="17.486" r="1.285"></circle>
                              </g>
                            </svg>
                          <span className="leading-5 ml-1">{user.profile_context}</span></span>
                        }
                      </div>
                  </div>
                  <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                      <div className="text-center pr-3 text-white"><span className="font-bold text-white">{user.following_count}</span><span className="text-gray-500"> Following</span></div>
                      <div className="text-center px-3 text-white"><span className="font-bold text-white">{user.follower_count}</span><span className="text-gray-500"> Followers</span></div>
                  </div>
              </div>
          </div>
          <hr className="border-gray-800" />
      </div>
      }
      <div>
        <hr className="border-b-gray-800" />
      </div>
    </>
  )
}
