import "reflect-metadata";
import express, { Application } from "express";
import moviesRoutes from "./routes/movies.routes";
import { handleErrors } from "./error";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRoutes);

app.use(handleErrors);

export default app;
