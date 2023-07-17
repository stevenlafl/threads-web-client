import { NextApiRequest, NextApiResponse } from "next";
import { ThreadsAPI } from 'threads-api';
import { setTimeout } from 'timers/promises';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, my_device_id, my_user_id, user_id } = req.body;
  
  let payload: any = {};

  if (fs.existsSync('./json/block.json')) {
    console.log('sent test mute');
    payload = JSON.parse(fs.readFileSync('./json/block.json', 'utf8'));
    await setTimeout(1000);
  }
  else {
    try {
      const client = new ThreadsAPI({ verbose: true, token, userID: my_user_id, deviceID: my_device_id });
      payload = await client.block(user_id);
      //payload['error'] = 'Not implemented';
    } catch (e: any) {
      payload = e.data ? e.data : {
        'error': e.message
      };
    }
  }

  return res.status(200).json(payload);
}