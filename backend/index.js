import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

// Initialize Express App

const app = express();
const port = 8000;

// Express Middlewares

app.use(bodyParser.json());

// Env Config

env.config();

// Connect to Postgres Database

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_ACCESS,
  port: 5432,
});

db.connect();

let courses = [];

db.query("SELECT * FROM courses", (err, res) => {
  if (err) {
    console.error("Error exectuing query", err.stack);
  } else {
    courses = res.rows;
  }
});

// HTTP REQUESTS

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchedCourse = courses.find((course) => course.id === id);

  if (searchedCourse == null) {
    console.log("CANNOT GET ID");
    res.send("CANNOT GET ID");
  } else {
    res.json(searchedCourse);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
