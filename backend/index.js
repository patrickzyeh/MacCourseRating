import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// Initialize Express App

const app = express();
const port = 5000;

// Express Middlewares

app.use(bodyParser.json());

// Postgres Database

// ENCRYPT THESE DATA LATER
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "",
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
