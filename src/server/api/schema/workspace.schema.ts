import { z } from 'zod';

export const createWorkspaceSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  emoticon: z.string().optional(),
});

export const paramsWorkspaceSchema = z.object({
  id: z.string(),
});

export const updateWorkspaceSchema = z.object({
  params: paramsWorkspaceSchema,
  body: z
    .object({
      title: z.string().min(1, { message: 'Title is required' }),
      emoticon: z.string().optional(),
    })
    .partial(),
});

export const filterWorkspaceSchema = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type CreateWorkspaceSchema = z.TypeOf<typeof createWorkspaceSchema>;
export type ParamsWorkspaceSchema = z.TypeOf<typeof paramsWorkspaceSchema>;
export type UpdateWorkspaceSchema = z.TypeOf<typeof updateWorkspaceSchema>;
export type FilterWorkspaceSchema = z.TypeOf<typeof filterWorkspaceSchema>;
