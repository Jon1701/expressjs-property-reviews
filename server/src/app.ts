import "module-alias/register";
import express from "express";

import { postDeveloper } from "@controllers/api/developers";

const app: express.Application = express();

// Middleware.
app.use(express.json());

// Routers.
const apiRouter: express.Router = express.Router();

// Router registration.
app.use("/api", apiRouter);

// API Routes.
apiRouter.post("/developers", postDeveloper);

// Listen for connections.
const FALLBACK_PORT = 3000;
const port: number = Number.parseInt(process.env.PORT, 10) || FALLBACK_PORT;
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`); // eslint-disable-line
});
