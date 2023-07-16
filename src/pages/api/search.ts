import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';
import { setTimeout } from 'timers/promises';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, query, count } = req.body;
  
  let payload: any = {};

  if (fs.existsSync('./json/search.json')) {
    console.log('sent test like');
    payload = JSON.parse(fs.readFileSync('./json/search.json', 'utf8'));
    await setTimeout(1000);
  }
  else {
    try {
      const client = new Client({ token });
      
      payload = await client.users.search(query, count);
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}