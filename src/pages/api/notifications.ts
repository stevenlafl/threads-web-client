import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';
import { setTimeout } from 'timers/promises';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, max_id, pagination_first_record_timestamp } = req.body;

  let payload: any = {};

  if (fs.existsSync('./json/notifications.json')) {
    console.log('sent test notifications');
    payload = JSON.parse(fs.readFileSync('./json/notifications.json', 'utf8'));
    await setTimeout(1000);
  }
  else {
    try {
      const client = new Client({ token });

      if (!max_id || !pagination_first_record_timestamp) {
        payload = await client.feeds.notifications();
      }
      else {
        payload = await client.feeds.notifications(undefined, {
          max_id,
          pagination_first_record_timestamp,
        });
      }
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}