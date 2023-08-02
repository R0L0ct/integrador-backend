import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import routerApi from "./routes";
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from "./middlewares/error.middleware";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const server = http.createServer(app);

server.listen(3001, () => {
  console.log("Server on port 3001");
});
