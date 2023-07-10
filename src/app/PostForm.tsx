"use client";

import { useState } from 'react';


export default function LoginForm(props: any) {

  const [text, setText] = useState("");
  const token = props.token;
  const post_id = props.post_id;
  const addPost: any = props.addPost;

  async function handleChange(e: any) {
    setText(e.target.value);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        token: token,
        text: e.target.text.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json());

    addPost(response.token.media);
    setText("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
          <div className="m-2 w-10 py-1">
              {/* <img className="inline-block h-10 w-10 rounded-full" src="" alt="" /> */}
          </div>
          <div className="flex-1 px-2 pt-2 mt-2">
              <textarea className=" bg-transparent text-gray-400 font-medium text-lg w-full" rows={2} cols={50} placeholder="What's happening?" name="text" value={text} onChange={handleChange}></textarea>
          </div>                    
      </div>
      <div className="flex">
          <div className="w-10"></div>

          <div className="w-64 px-2">
              
              <div className="flex items-center">
                  <div className="flex-1 text-center px-1 py-1 m-2">
                      <a className="mt-1 group flex items-center text-gray-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300" target="_blank">
                          <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" /*style="--darkreader-inline-stroke: currentColor;"*/ data-darkreader-inline-stroke=""><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </a>
                  </div>

                  <div className="flex-1 text-center py-2 m-2">
                      <a className="mt-1 group flex items-center text-gray-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300" target="_blank">
                          <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" /*style="--darkreader-inline-stroke: currentColor;"*/ data-darkreader-inline-stroke=""><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </a>
                  </div>

                  <div className="flex-1 text-center py-2 m-2">
                      <a className="mt-1 group flex items-center text-gray-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300" target="_blank">
                          <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" /*style="--darkreader-inline-stroke: currentColor;"*/ data-darkreader-inline-stroke=""><path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </a>
                  </div>

                  <div className="flex-1 text-center py-2 m-2">
                      <a className="mt-1 group flex items-center text-gray-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-gray-300" target="_blank">
                      <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" /*style="--darkreader-inline-stroke: currentColor;"*/ data-darkreader-inline-stroke=""><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </a>
                  </div>
              </div>
          </div>

          <div className="flex-1">
            <button className="bg-blue-400 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
              Post
            </button>
          </div>
      </div>
    </form>
  )
}
