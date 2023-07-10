import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';

import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  const { token } = req.body;
  const post_id = req.query.slug as string;

  console.log(token);
  console.log(post_id);

  let payload: any = {};

  if (fs.existsSync('./post_fetch.json')) {
    console.log('sent test post fetch');
    payload = JSON.parse(fs.readFileSync('./post_fetch.json', 'utf8'));
  }
  else {
    try {
      const client = new Client({ token });

      payload = await client.posts.fetch(post_id);
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}