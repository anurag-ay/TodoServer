import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

import corsConfig from "./startup/corsConfig.js";
import databaseConfig from "./startup/databaseConfig.js";
import errorHandlingConfig from "./startup/errorHandlingConfig.js";
import redirectionRoutes from "./startup/redirectionRoutes.js";

//inbuilt middleware
app.use(express.json());

// cors configuration
corsConfig(app);

// database configuration
databaseConfig();

// redirecting routes
redirectionRoutes(app);

// error handling configuration
errorHandlingConfig();

// Initialize dynamic port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}.....`));
