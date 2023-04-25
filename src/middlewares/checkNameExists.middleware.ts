import { NextFunction, Request, Response } from "express";
import { TMovieRequest } from "../interfaces/movies.interfaces";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const checkNameExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const movieBody: TMovieRequest = request.body;

  if (movieBody.name) {
    const movieRepository: Repository<Movie> =
      AppDataSource.getRepository(Movie);

    const movieExists = await movieRepository.exist({
      where: { name: movieBody.name },
    });

    if (movieExists) {
      throw new AppError("Movie already exists.", 409);
    }
  }

  return next();
};

export default checkNameExistsMiddleware;
