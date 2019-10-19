import "./utils/dotenv";
import next from "next";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import logger from "./utils/logger";

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: path.join(__dirname, "..", "app"), dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cookieParser());

    !dev && server.use(compression()); // https://github.com/zeit/next.js/issues/3890
    server.use(helmet());

    server.get("*", (req, res) => handle(req, res));

    // eslint-disable-next-line no-unused-vars
    server.use((err, req, res, next) => {
      // eslint-disable-next-line no-console
      logger.error(err);
      res.status(err.status || 500).send(req.xhr ? { error: "An error occurred" } : "An error occurred");
    });

    server.listen(port, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      logger.info(`Listening at: ${process.env.HOST}`);
    });
  })
  .catch(ex => {
    logger.error(ex.stack);
    process.exit(1);
  });
