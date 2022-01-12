import express from "express";

const FALLBACK_PORT = 3000;

const app: express.Application = express();

// Middleware.
app.use(express.json());

// Routers.
const apiRouter: express.Router = express.Router();

// Router registration.
app.use("/api", apiRouter);

// Listen for connections.
const port: number = Number.parseInt(process.env.PORT, 10) || FALLBACK_PORT;
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`); // eslint-disable-line
});
