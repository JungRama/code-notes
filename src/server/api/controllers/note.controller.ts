import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TRPCError } from '@trpc/server';
import { type Context } from '~/server/api/trpc';
import {
  ParamsNoteSchema,
  UpdateNoteSchema,
  type CreateNoteSchema,
} from '../schema/note.schema';
import {
  createNote,
  deleteNote,
  findAllNotes,
  findOneNote,
  updateNote,
} from '../services/note.service';

export const getNotesByWorkspaceHandler = async ({
  ctx,
  workspaceId,
}: {
  ctx: Context;
  workspaceId: string;
}) => {
  try {
    const note = await findAllNotes({
      where: {
        workspaceId,
        userId: ctx.session?.user.id,
      },
    });

    return {
      data: note,
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

export const getNoteByIdHandler = async ({
  ctx,
  id,
}: {
  ctx: Context;
  id: string;
}) => {
  try {
    const note = await findOneNote({
      where: {
        id,
        userId: ctx.session?.user.id,
      },
    });

    return {
      data: note,
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

export const createNoteHandler = async ({
  input,
  ctx,
}: {
  input: CreateNoteSchema;
  ctx: Context;
}) => {
  try {
    const note = await createNote({
      input: {
        title: input.title,
        workspace: {
          connect: {
            id: input.workspaceId,
          },
        },
        contentJson: '',
        contentHTML: '',
        user: {
          connect: {
            id: ctx.session?.user.id,
          },
        },
      },
    });

    return {
      data: note,
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

export const updateNoteHandler = async ({
  input,
  ctx,
}: {
  input: UpdateNoteSchema;
  ctx: Context;
}) => {
  try {
    const note = await updateNote({
      where: {
        id: input.params.id,
        userId: ctx.session?.user.id,
      },
      input: {
        title: input.body.title,
        contentJson: input.body.contentJson,
        contentHTML: input.body.contentHTML,
        user: {
          connect: {
            id: ctx.session?.user.id,
          },
        },
      },
    });

    return {
      data: note,
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

export const deleteNoteHandler = async ({
  paramsInput,
  ctx,
}: {
  paramsInput: ParamsNoteSchema;
  ctx: Context;
}) => {
  try {
    const note = await deleteNote({
      where: {
        id: paramsInput.id,
        userId: ctx.session?.user.id,
      },
    });

    return {
      data: note,
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
