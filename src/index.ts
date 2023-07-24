import config from "config";
import express from "express";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes/routes";

const port = config.get<number>("port");
const app = express();

routes(app);

app.listen(port, async () => {
  logger.info(`Listening on port ${port}`);

  await connect();
});
