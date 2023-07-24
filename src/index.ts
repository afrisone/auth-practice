import config from "config";
import express from "express";
import connect from "./utils/connect";
import logger from "./utils/logger";

const port = config.get<number>("port");
const app = express();

app.get("/", (req, res) => {
  res.json({});
});

app.get("/session", (req, res) => {
  res.json({});
});

app.listen(port, async () => {
  logger.info(`Listening on port ${port}`);

  await connect();
});
