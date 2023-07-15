import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';
import { setTimeout } from 'timers/promises';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, my_user_id, post_id } = req.body;
  
  let payload: any = {};

  if (fs.existsSync('./json/like.json')) {
    console.log('sent test like');
    payload = JSON.parse(fs.readFileSync('./json/like.json', 'utf8'));
    await setTimeout(1000);
  }
  else {
    try {
      const client = new Client({ token });
      payload = await client.posts.like(post_id, my_user_id);
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}