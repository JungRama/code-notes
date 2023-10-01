import { createTRPCRouter } from '~/server/api/trpc';
import { workspaceRouter } from '~/server/api/routers/workspace.router';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  workspace: workspaceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
