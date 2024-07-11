// Router for rating CRUD operations

import express from "express";
import pg from "pg";
import env from "dotenv";

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

// Express Routers

const router = express.Router();

// GET Specific Course Ratings

router.get("/:course_code", async (req, res) => {
  try {
    const courseCode = req.params.course_code;
    const result = await db.query(
      "SELECT * FROM ratings WHERE course_code = $1",
      [courseCode]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// NEED PUT REQUEST TO ADD RATING

export default router;
