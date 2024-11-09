const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");

// const scheduler = require("./utils/scheduler"); ///////////

const usersRouter = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(bodyparser.json());

// // Serving Static Files
// app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res) => {
  res.status(200).json({
    message: "Hey there! from the sever side",
    app: "Hotel-Reservation-System",
  });
});

app.use("/api/v1/users", usersRouter);

module.exports = app;
