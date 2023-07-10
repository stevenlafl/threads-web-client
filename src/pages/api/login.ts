import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  
  let payload: any = {};

  try {
    let client = new Client({});
    await client.login(username, password);
    payload['token'] = client.token;
  } catch (e: any) {
    payload['error'] = e.message;
  }

  return res.status(200).json(payload);
}