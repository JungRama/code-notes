import type { Workspace } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TRPCError } from '@trpc/server';
import type {
  createSchema,
  paramsSchema,
  updateSchema,
} from '~/server/api/schema/workspace.schema';
import {
  createWorkspace,
  deleteWorkspace,
  findAllWorkspaces,
  updateWorkspace,
} from '~/server/api/services/workspace.service';
import { type Context } from '~/server/api/trpc';

export const getWorkspacesHandler = async ({ ctx }: { ctx: Context }) => {
  try {
    const workspace = await findAllWorkspaces({
      where: {
        userId: ctx.session?.user.id,
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    });

    return {
      data: workspace as Pick<Workspace, 'id' | 'title' | 'slug'>[],
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message,
      });
    } else {
      throw error;
    }
  }
};

export const createWorkspaceHandler = async ({
  input,
  ctx,
}: {
  input: createSchema;
  ctx: Context;
}) => {
  try {
    const slug = input.title;

    const workspace = await createWorkspace({
      input: {
        title: input.title,
        slug: slug,
        user: {
          connect: {
            id: ctx.session?.user.id,
          },
        },
      },
    });

    return {
      data: workspace,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message,
      });
    } else {
      throw error;
    }
  }
};

export const updateWorkspaceHandler = async ({
  input,
  ctx,
}: {
  input: updateSchema;
  ctx: Context;
}) => {
  try {
    const slug = input.title;

    const workspace = await updateWorkspace({
      where: {
        id: '1',
      },
      input: {
        title: input.title,
        slug: slug,
        user: {
          connect: {
            id: ctx.session?.user.id,
          },
        },
      },
    });

    return {
      data: workspace,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message,
      });
    } else {
      throw error;
    }
  }
};

export const deleteWorkspaceHandler = async ({
  paramsInput,
}: {
  paramsInput: paramsSchema;
}) => {
  try {
    const workspace = await deleteWorkspace({
      where: {
        id: paramsInput.id,
      },
    });

    return {
      data: workspace,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: error.message,
      });
    } else {
      throw error;
    }
  }
};
