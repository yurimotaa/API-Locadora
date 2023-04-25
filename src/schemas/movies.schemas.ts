import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().optional().nullable(),
  duration: z.number().int().positive(),
  price: z.number().int(),
});

const requestMovieSchema = movieSchema.omit({ id: true });

const responseMovieSchema = movieSchema;

const updateMovieSchema = movieSchema.omit({ id: true }).partial();

export {
  movieSchema,
  requestMovieSchema,
  responseMovieSchema,
  updateMovieSchema,
};
