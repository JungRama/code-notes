import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

import {
  createNoteHandler,
  deleteNoteHandler,
  getNoteByIdHandler,
  getNotesByWorkspaceHandler,
  updateNoteHandler,
} from '../controllers/note.controller';
import {
  createNoteSchema,
  paramsNoteSchema,
  updateNoteSchema,
} from '../schema/note.schema';
import { updateNote } from '../services/note.service';

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        workspaceId: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      return getNotesByWorkspaceHandler({
        ctx,
        workspaceId: input.workspaceId,
      });
    }),

  getById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      return getNoteByIdHandler({
        ctx,
        id: input.id,
      });
    }),

  create: protectedProcedure
    .input(createNoteSchema)
    .mutation(({ input, ctx }) => {
      return createNoteHandler({
        input,
        ctx,
      });
    }),

  update: protectedProcedure
    .input(updateNoteSchema)
    .mutation(({ input, ctx }) => {
      return updateNoteHandler({
        input,
        ctx,
      });
    }),

  delete: protectedProcedure
    .input(paramsNoteSchema)
    .mutation(({ input, ctx }) => {
      return deleteNoteHandler({
        paramsInput: input,
        ctx,
      });
    }),
});
