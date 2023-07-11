import { NextApiRequest, NextApiResponse } from "next";
import { Client } from '@threadsjs/threads.js';
import * as fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, text, post_id } = req.body;
  
  let payload: any = {};

  if (fs.existsSync('./unlike.json')) {
    console.log('sent test like');
    payload = JSON.parse(fs.readFileSync('./unlike.json', 'utf8'));
  }
  else {
    try {
      const client = new Client({ token });

      let text_post_app_info = JSON.stringify({"quoted_post_id": post_id, "reply_control": 0});

      const requestBody = {
        publish_mode: "text_post",
        text_post_app_info,
        timezone_offset: "-25200",
        source_type: "4",
        _uid: "1",
        device_id: `android-${client.androidId}`,
        caption: text,
        upload_id: new Date().getTime(),
        device: {
          manufacturer: "OnePlus",
          model: "ONEPLUS+A3010",
          android_version: 25,
          android_release: "7.1.1",
        },
      };
      
      payload = await client.rest.request(`/api/v1/media/configure_text_only_post/`, {
        method: 'POST',
        body: `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(requestBody))}`,
      });
    } catch (e: any) {
      payload['error'] = e.message;
    }
  }

  return res.status(200).json(payload);
}