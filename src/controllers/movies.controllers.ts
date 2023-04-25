import { Request, Response } from "express";
import { TMovieRequest, TMovieResponse } from "../interfaces/movies.interfaces";
import createMovieService from "../services/createMovie.service";
import updateMovieService from "../services/updateMovie.service";
import deleteMovieService from "../services/deleteMovie.service";

const createMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieData: TMovieRequest = request.body;

  const newMovie: TMovieResponse = await createMovieService(movieData);

  return response.status(201).json(newMovie);
};

const updateMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movieData: TMovieRequest = request.body;
  const idMovie: number = parseInt(request.params.id);

  const movieUpdated = await updateMovieService(movieData, idMovie);
  return response.status(200).json(movieUpdated);
};

const deleteMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idMovie: number = parseInt(request.params.id);
  const deleted = await deleteMovieService(idMovie);

  return response.status(204).send();
};

export { createMovieController, updateMovieController, deleteMovieController };
