// Router for rating CRUD operations

import express from "express";
import pg from "pg";
import env from "dotenv";
import checkAuthentication from "../middleware/authorization.js";

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

// GET a User's Ratings

router.get("/user/:user", async (req, res) => {
  try {
    const email = req.params.user;
    const result = await db.query("SELECT * FROM ratings WHERE email = $1", [
      email,
    ]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE RATING

router.get(
  "/delete/:course_code/:user",
  checkAuthentication,

  async (req, res) => {
    try {
      const courseCode = req.params.course_code;
      const email = req.params.user;
      await db.query(
        "DELETE FROM ratings WHERE email = $1 and course_code = $2",
        [email, courseCode]
      );
      res.status(200).json({ success: "Rating deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
