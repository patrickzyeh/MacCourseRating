// Router for course API

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

// GET All Course

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM courses");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Specific Course

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await db.query("SELECT * FROM courses WHERE id = $1", [id]);
    if (result.rows.length == "0") {
      res.status(500).json({ error: "CANNOT GET ID" });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
