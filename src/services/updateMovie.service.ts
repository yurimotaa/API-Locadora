import { Repository } from "typeorm";
import { TMovieRequest, TMovieResponse } from "../interfaces/movies.interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { responseMovieSchema } from "../schemas/movies.schemas";

const updateMovieService = async (
  movieData: TMovieRequest,
  idMovie: number
): Promise<TMovieResponse> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const updatedMovie: TMovieResponse = await movieRepository.save({
    id: idMovie,
    ...movieData,
  });

  const newMovie = await movieRepository.findOneBy({ id: updatedMovie.id });

  const movieVerified: TMovieResponse = responseMovieSchema.parse(newMovie);

  return movieVerified;
};

export default updateMovieService;
