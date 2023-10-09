import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  workspaceId: z.string(),
});

export const paramsNoteSchema = z.object({
  id: z.string(),
});

export const updateNoteSchema = z.object({
  params: paramsNoteSchema,
  body: z
    .object({
      title: z.string().min(1, { message: 'Title is required' }),
      description: z.string(),
      coverImage: z.string(),
      contentJson: z.string(),
      contentHTML: z.string(),
    })
    .partial(),
});

export const filterNoteSchema = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type CreateNoteSchema = z.TypeOf<typeof createNoteSchema>;
export type ParamsNoteSchema = z.TypeOf<typeof paramsNoteSchema>;
export type UpdateNoteSchema = z.TypeOf<typeof updateNoteSchema>;
export type FilterNoteSchema = z.TypeOf<typeof filterNoteSchema>;
