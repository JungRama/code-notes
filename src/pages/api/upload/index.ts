import { put } from '@vercel/blob';
import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = req.body || '';
  const filename = req.headers['x-vercel-filename'] ?? ('file.txt' as string);
  const contentType = req.headers['content-type'] ?? 'text/plain';
  const fileType = `.${contentType.split('/')[1]}`;

  console.log(filename);
  console.log('file', file);

  // construct final filename based on content-type if not provided
  // const finalName = filename.includes(fileType)
  //   ? filename
  //   : `${filename as string}${fileType}`;
  // const blob = await put(finalName, file, {
  //   contentType: 'image/png',
  //   access: 'public',
  // });

  // return res.json(blob);
}
