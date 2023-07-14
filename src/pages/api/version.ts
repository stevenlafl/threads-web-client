import { NextApiRequest, NextApiResponse } from "next";
import * as semver from 'semver';
import { Client } from '@threadsjs/threads.js';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, post_id } = req.body;
  
  let payload: any = {};

  if (fs.existsSync('./version.json')) {
    console.log('sent test post');
    payload = JSON.parse(fs.readFileSync('./version.json', 'utf8'));
  }
  else {
    try {
      payload['current'] = 
        JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
      let github = await fetch(`https://api.github.com/repositories/664465730/tags`).then(res => res.json());
      payload['latest'] = github[0].name;
      payload['update'] = semver.gt(github[0].name, payload['current']);

    }
    catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}