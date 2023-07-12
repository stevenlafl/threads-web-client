import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';

import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  const { token, max_id } = req.body;
  const post_id = req.query.slug as string;

  // console.log(token);
  // console.log(post_id);

  let payload: any = {};

  if (fs.existsSync('./post_fetch.json')) {
    console.log('sent test post fetch');
    payload = JSON.parse(fs.readFileSync('./post_fetch.json', 'utf8'));
  }
  else {
    try {
      const client = new Client({ token });

      payload = await client.rest.request(`/api/v1/text_feed/${post_id}/replies/` + (max_id ? `?paging_token=${encodeURIComponent(max_id)}` : ""), {});

    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}