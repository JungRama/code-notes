import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

import {
  createWorkspaceSchema,
  paramsWorkspaceSchema,
  updateWorkspaceSchema,
} from '~/server/api/schema/workspace.schema';

import {
  createWorkspaceHandler,
  deleteWorkspaceHandler,
  getWorkspacesHandler,
  updateWorkspaceHandler,
} from '~/server/api/controllers/workspace.controller';

export const workspaceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return getWorkspacesHandler({
      ctx,
    });
  }),

  create: protectedProcedure
    .input(createWorkspaceSchema)
    .mutation(({ input, ctx }) => {
      return createWorkspaceHandler({
        input,
        ctx,
      });
    }),

  update: protectedProcedure
    .input(updateWorkspaceSchema)
    .mutation(({ input, ctx }) => {
      return updateWorkspaceHandler({
        input,
        ctx,
      });
    }),

  delete: protectedProcedure
    .input(paramsWorkspaceSchema)
    .mutation(({ input, ctx }) => {
      return deleteWorkspaceHandler({
        paramsInput: input,
        ctx,
      });
    }),
});
