import { NextFunction, Request, Response } from "express";
import { TMovieRequest } from "../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const checkIdExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieId: number = parseInt(request.params.id);

  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const idExists = await movieRepository.exist({
    where: { id: movieId },
  });

  if (!idExists) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export default checkIdExistsMiddleware;
