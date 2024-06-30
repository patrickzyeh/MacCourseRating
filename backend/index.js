import express from "express";
import bodyParser from "body-parser";
import courseRouter from "./routers/courses.js";

// Initialize Express App

const app = express();
const port = 8000;

// Express Middlewares

app.use(bodyParser.json());

// HTTP REQUESTS

// API

app.use("/api/courses", courseRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
