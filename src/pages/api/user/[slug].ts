import { NextApiRequest, NextApiResponse } from "next";
import { ThreadsAPI } from 'threads-api';
import { setTimeout } from 'timers/promises';

import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  const { token, my_device_id, my_user_id, max_id } = req.body;
  const user_id = req.query.slug as string;

  // console.log(token);
  // console.log(user_id);

  let payload: any = {};

  if (fs.existsSync('./json/user_fetch.json')) {
    console.log('sent test user fetch');
    payload = JSON.parse(fs.readFileSync('./json/user_fetch.json', 'utf8'));
    await setTimeout(1000);
  }
  else {
    try {
      const client = new ThreadsAPI({ verbose: true, token, userID: my_user_id, deviceID: my_device_id });

      payload = await client.getUserProfileLoggedIn(user_id);
    } catch (e: any) {
      payload = e.data ? e.data : {
        'error': e.message
      };
    }
  }

  return res.status(200).json(payload);
}