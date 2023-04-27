import { z } from "zod";
import {
  movieSchema,
  requestMovieSchema,
  updateMovieSchema,
} from "../schemas/movies.schemas";

type TMovie = z.infer<typeof movieSchema>;

type TMovieRequest = z.infer<typeof requestMovieSchema>;

type TMovieResponse = z.infer<typeof movieSchema>;

type TMovieUpdate = z.infer<typeof updateMovieSchema>;

interface TMoviesPagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: TMovie;
}

export {
  TMovie,
  TMovieRequest,
  TMovieResponse,
  TMovieUpdate,
  TMoviesPagination,
};
