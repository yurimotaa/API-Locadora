import { Router } from "express";
import checkBodyValidationMiddleware from "../middlewares/checkBodyValidation.middleware";
import {
  requestMovieSchema,
  updateMovieSchema,
} from "../schemas/movies.schemas";
import {
  createMovieController,
  deleteMovieController,
  getAllMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import checkNameExistsMiddleware from "../middlewares/checkNameExists.middleware";
import checkIdExistsMiddleware from "../middlewares/checkIdExists.middleware";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  checkBodyValidationMiddleware(requestMovieSchema),
  checkNameExistsMiddleware,
  createMovieController
);
moviesRoutes.get("", getAllMoviesController);
moviesRoutes.patch(
  "/:id",
  checkBodyValidationMiddleware(updateMovieSchema),
  checkIdExistsMiddleware,
  checkNameExistsMiddleware,
  updateMovieController
);
moviesRoutes.delete("/:id", checkIdExistsMiddleware, deleteMovieController);

export default moviesRoutes;
