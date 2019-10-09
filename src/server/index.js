import "./utils/dotenv";
import next from "next";
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";
import logger from "./utils/logger";
// import Guid from "guid";

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: path.join(__dirname, "..", "app"), dev });
const handle = app.getRequestHandler();

let firebase = require("firebase");

// Initialize Firebase
let config = {
  apiKey: "AIzaSyDUaVV59ODWQls88wL-kNQ8tEo9M7-0Zm8",
  authDomain: "personal-73922.firebaseapp.com",
  databaseURL: "https://personal-73922.firebaseio.com",
  projectId: "personal-73922",
  storageBucket: "personal-73922.appspot.com",
  messagingSenderId: "111210213312"
};

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());

  !dev && server.use(compression()); // https://github.com/zeit/next.js/issues/3890
  server.use(helmet());

  // server.get("*", (req, res, next) => {
  //   // ignore static files and code-split updates
  //   if (/^\/_next|static/.test(req.path)) {
  //     return next();
  //   }
  // });

  server.get("*", (req, res) => handle(req, res));

  // eslint-disable-next-line no-unused-vars
  server.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    logger.error(err);
    res
      .status(err.status || 500)
      .send(req.xhr ? { error: "An error occurred" } : "An error occurred");
  });

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    logger.info(`Listening at: ${process.env.HOST}`);
  });
}).catch((ex) => {
  logger.error(ex.stack);
  process.exit(1)
});
