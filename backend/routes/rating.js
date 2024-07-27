// Router for rating CRUD operations

import express from "express";
import pg from "pg";
import env from "dotenv";
import checkAuthentication from "../middleware/authorization.js";
import bodyParser from "body-parser";

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

// Bodyparser Middleware

router.use(bodyParser.urlencoded({ extended: true }));

// GET Specific Course Ratings

router.get("/specific/:course_code", async (req, res) => {
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

// GET Specific User Course Rating

router.get("/specific/:course_code/:user", async (req, res) => {
  try {
    const courseCode = req.params.course_code;
    const user = req.params.user;
    const result = await db.query(
      "SELECT * FROM ratings WHERE course_code = $1 and email = $2",
      [courseCode, user]
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

// GET Courses with the most Ratings

router.get("/top", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT course_code, COUNT(course_code) as counted FROM ratings GROUP BY course_code ORDER BY counted DESC LIMIT 5"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Most recent Ratingbs

router.get("/recent", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id,course_code FROM ratings WHERE id IN (SELECT MIN(id) FROM ratings GROUP BY course_code) ORDER BY id DESC LIMIT 5"
    );
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
      console.log("Rating deleted");
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// POST RATING

router.post("/post/:courseCode/:user", async (req, res) => {
  try {
    const email = req.params.user;
    const courseCode = req.params.courseCode;
    const easeRating = req.body.easeRating;
    const practicalityRating = req.body.practicalityRating;
    const enjoyabilityRating = req.body.enjoyabilityRating;
    const overallRating = req.body.overallRating;
    const comment = req.body.comment;
    const postDate = req.body.postDate;

    const result = await db.query(
      "SELECT * FROM ratings WHERE email = $1 and course_code = $2",
      [email, courseCode]
    );

    if (result.rowCount === 0) {
      await db.query(
        "INSERT INTO ratings (email, course_code, ease_rating, practicality_rating, enjoyability_rating, overall_rating, review, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
          email,
          courseCode,
          easeRating,
          practicalityRating,
          enjoyabilityRating,
          overallRating,
          comment,
          postDate,
        ]
      );
      res.status(200).json({ success: "Rating posted" });
      console.log("Rating posted");
    } else {
      res.status(500).json({ error: "Users are limited to 1 post per course" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// PATCH RATING

router.patch("/update/:courseCode/:user", async (req, res) => {
  try {
    const email = req.params.user;
    const courseCode = req.params.courseCode;
    const easeRating = req.body.easeRating;
    const practicalityRating = req.body.practicalityRating;
    const enjoyabilityRating = req.body.enjoyabilityRating;
    const overallRating = req.body.overallRating;
    const comment = req.body.comment;

    const result = await db.query(
      "SELECT * FROM ratings WHERE email = $1 and course_code = $2",
      [email, courseCode]
    );

    if (result.rowCount === 1) {
      await db.query(
        "UPDATE ratings SET ease_rating = $3, practicality_rating = $4, enjoyability_rating = $5, overall_rating = $6, review = $7 WHERE email = $1 and course_code = $2",
        [
          email,
          courseCode,
          easeRating,
          practicalityRating,
          enjoyabilityRating,
          overallRating,
          comment,
        ]
      );
      res.status(200).json({ success: "Rating posted" });
      console.log("Rating updated");
    } else {
      res.status(500).json({ error: "Users are limited to 1 post per course" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
