import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 8089;
const router = require("./Router/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
