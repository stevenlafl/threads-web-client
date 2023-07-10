import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from '@threadsjs/threads.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  
  let payload: any = {};

  try {
    payload['token'] = await getToken(username, password);
  } catch (e: any) {
    payload['error'] = e.message;
  }

  return res.status(200).json(payload);
}