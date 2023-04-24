import { Router } from "express";

const moviesRoutes: Router = Router();

moviesRoutes.post("");
moviesRoutes.get("");
moviesRoutes.patch("/:id");
moviesRoutes.delete("/:id");

export default moviesRoutes;
