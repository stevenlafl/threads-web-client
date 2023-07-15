import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';
import { setTimeout } from 'timers/promises';

import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, max_id } = req.body;

  let payload: any = {};

  if (fs.existsSync('./json/feed.json')) {
    console.log('sent test feed');
    payload = JSON.parse(fs.readFileSync('./json/feed.json', 'utf8'));
    await setTimeout(1000);
  }
  else {
    try {
      const client = new Client({ token });

      payload = await client.feeds.fetch(max_id);
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}