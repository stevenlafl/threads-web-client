"use client";

import Image from 'next/image'
import { Link } from 'nextjs13-router-events';

export default function NotificationItem(props: any) {
  const item = props.item;
  const isNew = props.new;

  const urlConverter = (text: string) => {
    if (text) {
      let matches = text.match(/([^\?]*)\?id=([^_]*)/);
      if (matches) {
        return [matches[1], matches[2]];
      }
    }
    return ['', ''];
  };

  const profile_image = item.args.profile_image;
  const username = item.args.profile_name;
  const action = item.args.rich_text?.match(/\{[^\}]*\} (.*)/)?.[1] || '';


  let [_, profile_id] = urlConverter(item.args.profile_image_destination);
  let [type, post_id] = urlConverter(item.args.destination);
  if (type == 'media') {
    type = 'post';
  }

  return (
    <>
      <div className={"text-white rounded-md p-2 m-2 hover:bg-[#343638]" + (isNew ? ' bg-[#343638]' : '')}>
        <div>
          <Link href={"/user/" + profile_id}>
            <Image className="inline-block h-10 w-10 rounded-full" src={profile_image} width="100" height="100" alt="" />
            <span className="inline-block pl-2">{username}</span>
          </Link>
        </div>
        <div className="pl-12">
          <Link href={"/" + type + "/" + post_id}>
            {action}
          </Link>
        </div>
      </div>
    </>
  )
}
