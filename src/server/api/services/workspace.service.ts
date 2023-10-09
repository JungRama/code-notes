import { type Prisma } from '@prisma/client';
import { db } from '~/server/db';
import generateUniqueSlug from '~/utils/slug';

/**
 * Retrieves all workspaces based on the specified filters.
 *
 * @param {Object} options - The options object.
 * @param {Partial<Prisma.WorkspaceWhereInput>} options.where - The filters to apply to the query.
 * @param {Prisma.WorkspaceSelect} options.select - The fields to select in the query.
 * @returns {Promise<Array<Prisma.Workspace>>>} - A promise that resolves to an array of workspaces.
 */
export const findAllWorkspaces = async ({
  where,
  select,
}: {
  where?: Partial<Prisma.WorkspaceWhereInput>;
  select?: Prisma.WorkspaceSelect;
}) => {
  return await db.workspace.findMany({
    where,
    select,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

/**
 * Creates a new workspace.
 *
 * @param {object} input - The input object containing the data for creating a workspace.
 * @param {Prisma.WorkspaceCreateInput} input.input - The data for creating the workspace.
 * @return {Promise<Prisma.Workspace>} A promise that resolves to the created workspace.
 */
export const createWorkspace = async ({
  input,
}: {
  input: Prisma.WorkspaceCreateInput;
}) => {
  const slug = await generateUniqueSlug(async (uniqueSlug) => {
    return (await db.workspace.findFirst({
      where: {
        slug: uniqueSlug,
        userId: input.user?.connect?.id,
      },
    }))
      ? true
      : false;
  }, input.title);

  return await db.workspace.create({
    data: {
      ...input,
      slug,
    },
  });
};

/**
 * Updates a workspace in the database.
 *
 * @param {Object} options - The options for updating a workspace.
 * @param {Prisma.WorkspaceWhereUniqueInput} options.where - The unique identifier of the workspace to update.
 * @param {Prisma.WorkspaceUpdateInput} options.input - The data to update the workspace with.
 * @returns {Promise<Prisma.Workspace>} - A promise that resolves to the updated workspace.
 */
export const updateWorkspace = async ({
  where,
  input,
}: {
  where: Prisma.WorkspaceWhereUniqueInput;
  input: Prisma.WorkspaceUpdateInput;
}) => {
  let slug = undefined;
  if (input.title) {
    slug = await generateUniqueSlug(async (uniqueSlug) => {
      return (await db.workspace.findFirst({
        where: {
          slug: uniqueSlug,
          userId: input.user?.connect?.id,
          NOT: {
            id: where.id,
          },
        },
      }))
        ? true
        : false;
    }, input.title as string);
  }

  return await db.workspace.update({
    where,
    data: {
      ...input,
      slug,
    },
  });
};

/**
 * Deletes a workspace.
 *
 * @param {Prisma.WorkspaceWhereUniqueInput} where - The unique identifier of the workspace to delete.
 * @return {Promise<void>} - A promise that resolves when the workspace is deleted.
 */
export const deleteWorkspace = async ({
  where,
}: {
  where: Prisma.WorkspaceWhereUniqueInput;
}) => {
  return await db.workspace.delete({ where });
};
