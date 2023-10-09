import { type Prisma } from '@prisma/client';
import { db } from '~/server/db';

/**
 * Finds all notes by workspace.
 *
 * @param {Object} options - The options object.
 * @param {Partial<Prisma.NoteWhereInput>} options.where - The where clause for filtering notes.
 * @param {Prisma.NoteSelect} options.select - The fields to select for each note.
 * @return {Promise<Array<Object>>} - A promise that resolves to an array of notes.
 */
export const findAllNotes = async ({
  where,
  select,
}: {
  where?: Partial<Prisma.NoteWhereInput>;
  select?: Prisma.NoteSelect;
}) => {
  return await db.note.findMany({
    where,
    select,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const findOneNote = async ({
  where,
  select,
}: {
  where?: Partial<Prisma.NoteWhereInput>;
  select?: Prisma.NoteSelect;
}) => {
  return await db.note.findFirstOrThrow({
    where,
    select,
  });
};

/**
 * Creates a new note.
 *
 * @param {object} input - The input object containing the note data.
 * @param {Prisma.NoteCreateInput} input.input - The note data to be created.
 * @returns {Promise<Prisma.Note>} - A promise that resolves to the created note.
 */
export const createNote = async ({
  input,
}: {
  input: Prisma.NoteCreateInput;
}) => {
  return await db.note.create({
    data: {
      ...input,
    },
  });
};

/**
 * Updates a note based on the provided input.
 *
 * @param {Object} options - The options object containing the following:
 *   - {Prisma.NoteWhereUniqueInput} where - The unique identifier of the note to update.
 *   - {Prisma.NoteUpdateInput} input - The data to update the note with.
 * @returns {Promise<Prisma.Note>} A promise that resolves to the updated note.
 */
export const updateNote = async ({
  where,
  input,
}: {
  where: Prisma.NoteWhereUniqueInput;
  input: Prisma.NoteUpdateInput;
}) => {
  return await db.note.update({
    where,
    data: {
      ...input,
    },
  });
};

/**
 * Deletes a note based on the provided criteria.
 *
 * @param {Prisma.NoteWhereUniqueInput} where - The criteria to determine which note to delete.
 * @return {Promise<void>} A promise that resolves when the note is successfully deleted.
 */
export const deleteNote = async ({
  where,
}: {
  where: Prisma.NoteWhereUniqueInput;
}) => {
  return await db.note.delete({ where });
};
