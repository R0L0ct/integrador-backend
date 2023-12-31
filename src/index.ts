import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import routerApi from "./routes";
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from "./middlewares/error.middleware";
import { config } from "./infrastructure/config";
import { options } from "./swagger";
const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: [
      "https://integrador-react-plum.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const specs = swaggerJSDoc(options);

routerApi(app);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const server = http.createServer(app);

const port = config.server.port;

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});
