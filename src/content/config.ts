import { defineCollection, z } from 'astro:content'; // Remove incorrect image import

// Define the schema separately for clarity
const blogSchema = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string(),
  author: z.string().default('Admin'),
  authorBio: z.string().optional(),
  category: z.string(), // Add required category field
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
  // heroImage: z.image().optional(), // REMOVE incorrect definition here
  heroImageAlt: z.string().optional(), // Alt text remains a string
  // Add social URLs to the base schema
  linkedinUrl: z.string().url().optional(),
  instagramUrl: z.string().url().optional(),
  youtubeUrl: z.string().url().optional(),
});

const blogCollection = defineCollection({
  type: 'content',
  // Use a function for the schema to access the image helper
  schema: ({ image }) => blogSchema.extend({
    // Define heroImage using the passed-in image helper
    heroImage: image().optional(),
  })
  // Note: We extend the existing blogSchema to keep other fields
  // Alternatively, define the whole schema inline here:
  // schema: ({ image }) => z.object({
  //   title: z.string(),
  //   pubDate: z.date(),
  //   description: z.string(),
  //   author: z.string().default('Admin'),
  //   authorBio: z.string().optional(),
  //   category: z.string(),
  //   tags: z.array(z.string()).optional(),
  //   draft: z.boolean().optional(),
  //   heroImage: image().optional(), // Use the passed-in helper
  //   heroImageAlt: z.string().optional()
  // })
});

// Manually define BlogPost based on expected structure and Zod schema inference
// We need to adjust this type definition slightly because the schema is now a function result
// A simpler approach for now is to remove the explicit type export if not strictly needed elsewhere,
// or adjust it to correctly infer from the functional schema if required.
// Let's remove it for now to avoid potential type complexity during this fix.
// export type BlogPost = { ... };

export const collections = {
  blog: blogCollection,
} as const; // Keep 'as const' for stricter collection object typing
