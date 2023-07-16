"use client";

import PostItem from './PostItem';

export default function FeedItem(props: any) {
  const token = props.token;
  const posts = props.item.posts;

  let levels = 0;
  const postItems = posts.map((post: any) => {
    let Item: JSX.Element = <PostItem key={post.id} token={token} item={{posts: [post]}} hasChildren={(posts.length - levels) > 1} hasParent={levels > 0} levels={levels} />
    levels++;
    return Item;
  });

  return (
    <>
      { postItems }
    </>
  )
}
