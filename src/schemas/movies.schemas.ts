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

const moviesSchema = z.array(movieSchema);

const paginationSchema = z.object({
  prevPage: z.string(),
  nextPage: z.string(),
  count: z.number(),
});

const getAllMoviesSchema = z.object({
  data: moviesSchema,
  page: z.number(),
  perPage: z.number(),
  pagination: paginationSchema,
});

export {
  movieSchema,
  requestMovieSchema,
  responseMovieSchema,
  updateMovieSchema,
  getAllMoviesSchema,
  moviesSchema,
};
