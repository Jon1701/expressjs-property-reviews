import "module-alias/register";
import express from "express";

import { db } from "@db/db";
import {
  getDevelopers,
  getSpecificDevelopers,
  postDevelopers,
  patchDevelopers,
} from "@controllers/api/developers";
import { postManagement, patchManagement } from "@controllers/api/management";

const app: express.Application = express();

// Connect to the database.
db.authenticate().catch((err) => console.log("Error: " + err));

// Middleware.
app.use(express.json());

// Routers.
const apiRouter: express.Router = express.Router();

// Router registration.
app.use("/api", apiRouter);

// API Routes.
apiRouter.get("/developers", getDevelopers);
apiRouter.post("/developers", postDevelopers);
apiRouter.get("/developers/:developerID", getSpecificDevelopers);
apiRouter.patch("/developers/:developerID", patchDevelopers);
apiRouter.post("/management", postManagement);
apiRouter.patch("/management/:managementID", patchManagement);

// Listen for connections.
const FALLBACK_PORT = 3000;
const port: number = Number.parseInt(process.env.PORT, 10) || FALLBACK_PORT;
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`); // eslint-disable-line
});
