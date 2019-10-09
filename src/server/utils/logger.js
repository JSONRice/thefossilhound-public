import bunyan from "bunyan";

const dev = process.env.NODE_ENV !== "production";

// Log level of debug and info include warn, error, and fatal.
const logger = bunyan.createLogger({
  name: "lcrf-fe",
  stream: process.stdout,
  level: dev ? "debug" : "info"
});

export default logger;
