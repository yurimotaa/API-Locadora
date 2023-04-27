import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import {
  TMovieResponse,
  TMoviesPagination,
} from "../interfaces/movies.interfaces";
import {
  getAllMoviesSchema,
  moviesSchema,
  responseMovieSchema,
} from "../schemas/movies.schemas";

const getAllMoviesService = async (
  page: number,
  perPage: number,
  sort: string,
  order: string
): Promise<any> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const count: number = await movieRepository.count();

  let movies: Movie[] | undefined;

  if (!sort) {
    sort = "id";
  } else if (sort !== "price" && sort !== "duration") {
    sort = "id";
  }

  if (!order) {
    order = "asc";
  } else if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (!page && !perPage) {
    perPage = 5;
    page = 1;
    movies = await movieRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
      order: { [sort]: order },
    });
  } else if (page && perPage) {
    if (perPage <= 0 || perPage > 5) {
      perPage = 5;
    }
    if (page <= 0) {
      page = 1;
    }
    movies = await movieRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
      order: { [sort]: order },
    });
  } else if (page && !perPage) {
    movies = await movieRepository.find({
      skip: (page - 1) * 5,
      take: 5,
      order: { [sort]: order },
    });
  } else if (!page && perPage) {
    if (perPage <= 0 || perPage > 5) {
      perPage = 5;
    }
    movies = await movieRepository.find({
      skip: 0,
      take: perPage,
      order: { [sort]: order },
    });
  }

  const returnMovies: TMovieResponse[] = moviesSchema.parse(movies);

  let prevPage: string | null = null;
  let nextPage: string | null = null;

  if (page > 1) {
    prevPage = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${perPage}`;
  }

  if (page * perPage < count) {
    nextPage = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${perPage}`;
  }

  return {
    prevPage,
    nextPage,
    count,
    data: returnMovies,
  };
};

export default getAllMoviesService;
