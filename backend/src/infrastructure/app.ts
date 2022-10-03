import express, { Request, Response } from "express";
import "./db";
import addRoutesToApp from "./combinedRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
addRoutesToApp(app);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello there! The app is running.");
});

export default app;
