import { NextApiRequest, NextApiResponse } from "next";
import { ThreadsAPI } from 'threads-api';
import { setTimeout } from 'timers/promises';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  
  let payload: any = {};

  if (fs.existsSync('./json/login.json')) {
    console.log('sent test login');
    payload = JSON.parse(fs.readFileSync('./json/login.json', 'utf8'));
    await setTimeout(1000);
  }
  else {
    try {
      let client = new ThreadsAPI({verbose: true, username, password});
      payload['token'] = await client.getToken();
      //payload['userId'] = await client.getCurrentUserID();
      payload['deviceId'] = client.deviceID;
    } catch (e: any) {
      payload = e.data ? e.data : {
        'error': e.message
      };
    }
  }

  return res.status(200).json(payload);
}