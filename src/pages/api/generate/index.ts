import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY ||
    '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',
});

import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // Check if the OPENAI_API_KEY is set, if not return 400
  // if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
  //   res.status(400).json({
  //     message:
  //       'Missing OPENAI_API_KEY – make sure to add it to your .env file.',
  //   });
  // }

  // console.log(req.body.prompt);

  // let { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that continues existing text based on context from prior text. ' +
          'Give more weight/priority to the later characters than the beginning ones. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences.',
        // we're disabling markdown for now until we can figure out a way to stream markdown text with proper formatting: https://github.com/steven-tey/novel/discussions/7
        // "Use Markdown formatting when appropriate.",
      },
      {
        role: 'user',
        content: req.body.prompt,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    n: 1,
  });

  res.status(200).json({ message: 'Hello from Next.js!' });

  // Convert the response into a friendly text-stream
  // const stream = OpenAIStream(response);

  // Respond with the stream
  // return new StreamingTextResponse(stream);
}

// export default async function handler(req: Request): Promise<Response> {

// }
