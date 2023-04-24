import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  duration: z.number(),
  price: z.number(),
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
