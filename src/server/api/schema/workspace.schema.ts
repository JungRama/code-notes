import { z } from 'zod';

export const create = z.object({
  title: z.string(),
});

export const params = z.object({
  id: z.string(),
});

export const update = z.object({
  params,
  body: z
    .object({
      title: z.string(),
    })
    .partial(),
});

export const filter = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type createSchema = z.TypeOf<typeof create>;
export type paramsSchema = z.TypeOf<typeof params>;
export type updateSchema = z.TypeOf<typeof update>['body'];
export type filterSchema = z.TypeOf<typeof filter>;
