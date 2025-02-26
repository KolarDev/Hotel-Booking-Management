import path from "path";
import express from "express";
import { Request, Response } from "express";
import bodyparser from "body-parser";
import { config } from "./config/index";
// const scheduler = require("./utils/scheduler"); ///////////

import usersRouter from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(bodyparser.json());

// // Serving Static Files
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hey there! from the sever side",
    app: "Hotel-Reservation-System",
  });
});

app.use("/api/v1/users", usersRouter);

export default app;
