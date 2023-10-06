import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

import {
  createNoteHandler,
  getNotesByWorkspaceHandler,
} from '../controllers/note.controller';
import { createNoteSchema } from '../schema/note.schema';

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

  create: protectedProcedure
    .input(createNoteSchema)
    .mutation(({ input, ctx }) => {
      return createNoteHandler({
        input,
        ctx,
      });
    }),

  // update: protectedProcedure
  //   .input(updateWorkspaceSchema)
  //   .mutation(({ input, ctx }) => {
  //     return updateWorkspaceHandler({
  //       input,
  //       ctx,
  //     });
  //   }),

  // delete: protectedProcedure
  //   .input(paramsWorkspaceSchema)
  //   .mutation(({ input, ctx }) => {
  //     return deleteWorkspaceHandler({
  //       paramsInput: input,
  //       ctx,
  //     });
  //   }),
});
