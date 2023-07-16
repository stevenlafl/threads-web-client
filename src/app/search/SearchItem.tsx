"use client";

import Image from 'next/image'
import { Link } from 'nextjs13-router-events';

export default function SearchItem(props: any) {
  const user = props.item;

  return (
    <>
      <div className="text-white rounded-md p-1 m-1 hover:bg-[#343638] clear-both overflow-hidden">
        <div>
          <Link href={"/user/" + user.pk}>
            <span className="inline-block pl-2 float-left">
              <Image className="inline-block h-12 w-12 rounded-full" src={user.profile_pic_url} width="100" height="100" alt="" />
            </span>
            <span className="inline-block pl-2 float-left">
              <span className="block">@{user.username}</span>
              <span className="block">{user.full_name}</span>
            </span>
          </Link>
        </div>
      </div>
    </>
  )
}
