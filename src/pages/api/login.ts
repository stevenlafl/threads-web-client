import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';
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
      let client = new Client({});
      await client.login(username, password);
      payload['token'] = client.token;
      payload['userId'] = client.userId;
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}