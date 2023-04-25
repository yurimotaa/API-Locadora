import { Repository } from "typeorm";
import {
  TMovie,
  TMovieRequest,
  TMovieResponse,
} from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { responseMovieSchema } from "../schemas/movies.schemas";

const createMovieService = async (
  movieData: TMovieRequest
): Promise<TMovieResponse> => {
  if (!("description" in movieData)) {
    movieData.description = null;
  }

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepository.create(movieData);

  await movieRepository.save(movie);

  const movieVerified: TMovieResponse = responseMovieSchema.parse(movie);

  return movieVerified;
};

export default createMovieService;
