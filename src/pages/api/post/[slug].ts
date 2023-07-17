import { NextApiRequest, NextApiResponse } from "next";
import { ThreadsAPI } from 'threads-api';
import { setTimeout } from 'timers/promises';

import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  const { token, my_device_id, my_user_id, max_id } = req.body;
  const post_id = req.query.slug as string;

  // console.log(token);
  // console.log(post_id);

  let payload: any = {};

  if (fs.existsSync('./json/post_fetch.json')) {
    console.log('sent test post fetch');
    payload = JSON.parse(fs.readFileSync('./json/post_fetch.json', 'utf8'));
    await setTimeout(1000);
  }
  else {
    try {
      const client = new ThreadsAPI({ verbose: true, token, userID: my_user_id, deviceID: my_device_id });

      payload = await client.getThreadsLoggedIn(post_id, max_id);
    } catch (e: any) {
      payload = e.data ? e.data : {
        'error': e.message
      };
    }
  }

  return res.status(200).json(payload);
}