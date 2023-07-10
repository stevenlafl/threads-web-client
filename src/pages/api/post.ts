import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, text } = req.body;
  
  let payload: any = {};

  if (fs.existsSync('./post.json')) {
    console.log('sent test post');
    payload = JSON.parse(fs.readFileSync('./post.json', 'utf8'));
  }
  else {
    try {
      const client = new Client({ token });
      payload['token'] = await client.posts.create(text, "1")
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}