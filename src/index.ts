import config from "config";
import express from "express";

const port = config.get("port");
const app = express();

app.get("/", (req, res) => {
  res.json({});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
