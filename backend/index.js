import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

// Initialize Express App

const app = express();
const port = 5000;

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

// HTTP REQUESTS

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
