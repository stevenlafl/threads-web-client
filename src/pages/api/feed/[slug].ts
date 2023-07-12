import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';

import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  const { token, max_id } = req.body;
  const user_id = req.query.slug as string;

  // console.log(token);
  // console.log(user_id);

  let payload: any = {};

  if (fs.existsSync('./user_feed.json')) {
    console.log('sent test user feed');
    payload = JSON.parse(fs.readFileSync('./user_feed.json', 'utf8'));
  }
  else {
    try {
      const client = new Client({ token });

      payload = await client.feeds.fetchThreads(user_id, max_id);
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}