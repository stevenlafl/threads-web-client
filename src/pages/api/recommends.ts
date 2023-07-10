import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from '@threadsjs/threads.js';

import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  let payload: any = {};

  if (fs.existsSync('./feed.json')) {
    console.log('sent test recommends');
    payload = JSON.parse(fs.readFileSync('./recommends.json', 'utf8'));
  }
  else {
    try {
      const { Client } = require('@threadsjs/threads.js');
      const client = new Client({ token });

      payload = await client.feeds.fetch();
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}