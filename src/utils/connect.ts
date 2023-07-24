import mongoose from "mongoose";
import config from "config";
import log from "./logger";

export default async function connect() {
  try {
    const dbUri = config.get<string>("dbUri");
    await mongoose.connect(dbUri);

    log.info("We're connected to the database!");
  } catch (err) {
    log.error(`Could not connect to DB. Error: ${err}`);
  }
}
