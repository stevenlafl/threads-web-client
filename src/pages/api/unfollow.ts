import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';
import { setTimeout } from 'timers/promises';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, user_id } = req.body;
  
  let payload: any = {};

  if (fs.existsSync('./json/unfollow.json')) {
    console.log('sent test unfollow');
    payload = JSON.parse(fs.readFileSync('./json/unfollow.json', 'utf8'));
    await setTimeout(1000);
  }
  else {
    try {
      const client = new Client({ token });
      payload = await client.friendships.unfollow(user_id);
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}