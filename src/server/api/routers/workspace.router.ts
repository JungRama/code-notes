import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';

import {
  create,
  params,
  update,
  filter,
} from '~/server/api/schema/workspace.schema';

import {
  createWorkspaceHandler,
  getWorkspacesHandler,
  updateWorkspaceHandler,
} from '~/server/api/controllers/workspace.controller';

export const workspaceRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return getWorkspacesHandler({
      ctx,
    });
  }),

  create: protectedProcedure.input(create).mutation(({ input, ctx }) => {
    return createWorkspaceHandler({
      input,
      ctx,
    });
  }),

  update: protectedProcedure.input(update).mutation(({ input, ctx }) => {
    return updateWorkspaceHandler({
      input: input.body,
      ctx,
    });
  }),
});
