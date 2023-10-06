import slugify from 'slugify';

/**
 * Generate a unique slug for a given model and title.
 *
 * @param modelName - The name of the model.
 * @param title - The title to generate the slug from.
 * @returns The generated unique slug.
 */
export default async function generateUniqueSlug(
  checkDb: (uniqueSlug: string) => Promise<boolean>,
  title: string,
): Promise<string> {
  const slug = slugify(title, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });

  let counter = 1;
  let uniqueSlug = slug;

  // Check if the slug already exists in the database for the given model
  while (await checkDb(uniqueSlug)) {
    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }

  return uniqueSlug;
}
