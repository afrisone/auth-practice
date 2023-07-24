import { Express } from "express";

export default function routes(app: Express) {
  app.get("/healthcheck", (req, res) => {
    res.sendStatus(200);
  });
}
