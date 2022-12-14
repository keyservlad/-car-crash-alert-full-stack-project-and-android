import express from "express";
import cookieParser from "cookie-parser"; // importing the prisma instance we created.
import logger from "morgan"; // importing the prisma instance we created.
import cors from "cors";

import { secrets } from "./utils";
import { errorHandler } from "./utils/errors";
import "./config";
import router from "./routes";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3001;

// Logging
const format =
  secrets.ENVIRONMENT === "development"
    ? "dev"
    : "[:date[clf]] :method :url :status :res[content-length] - :response-time ms";
app.use(logger(format));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routers
app.use(router);

// Error handler
app.use(errorHandler);

app.use((request, response, next) => {
  return response.redirect("https://" + request.headers.host + request.url);
});
// tslint:disable-next-line:no-console
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
