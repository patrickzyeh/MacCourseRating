// Router for rating CRUD operations

import express from "express";
import env from "dotenv";
import checkAuthentication from "../middleware/authorization.js";
import bodyParser from "body-parser";
import supabase from "../db.js";

// Env Config

env.config();

// Express Routers

const router = express.Router();

// Bodyparser Middleware

router.use(bodyParser.urlencoded({ extended: true }));

// GET Specific Course Ratings

router.get("/specific/:course_code", async (req, res) => {
  const courseCode = req.params.course_code;
  const { data, error } = await supabase
    .from("ratings")
    .select()
    .eq("course_code", courseCode);
  if (error) {
    res.status(500).json({ error: error });
  }
  if (data) {
    res.json(data);
  }
});

// GET Specific User Course Rating

router.get("/specific/:course_code/:user", async (req, res) => {
  const courseCode = req.params.course_code;
  const user = req.params.user;
  const { data, error } = await supabase
    .from("ratings")
    .select()
    .eq("course_code", courseCode)
    .eq("email", user);
  if (error) {
    res.status(500).json({ error: error });
  }
  if (data) {
    res.json(data);
  }
});

// GET a User's Ratings

router.get("/user/:user", async (req, res) => {
  const email = req.params.user;
  const { data, error } = await supabase
    .from("ratings")
    .select()
    .eq("email", email);
  if (error) {
    res.status(500).json({ error: error });
  }
  if (data) {
    res.json(data);
  }
});

// GET Courses with the most Ratings

router.get("/top", async (req, res) => {
  const { data, error } = await supabase.rpc("get_top_courses");
  if (error) {
    res.status(500).json({ error: error });
  }
  if (data) {
    res.json(data);
  }
});

// GET Most recent Ratingbs

router.get("/recent", async (req, res) => {
  const { data, error } = await supabase.rpc("get_min_id_by_course");
  if (error) {
    res.status(500).json({ error: error });
  }
  if (data) {
    res.json(data);
  }
});

// DELETE RATIN

router.get(
  "/delete/:course_code/:user",
  checkAuthentication,

  async (req, res) => {
    const courseCode = req.params.course_code;
    const email = req.params.user;
    const { data, error } = await supabase
      .from("ratings")
      .delete()
      .eq("email", email)
      .eq("course_code", courseCode)
      .select();
    if (error) {
      res.status(500).json({ error: error });
    }
    if (data) {
      res.status(200).json({ success: "Rating deleted" });
      console.log("Rating deleted");
    }
  }
);

// POST RATING

router.post("/post/:courseCode/:user", async (req, res) => {
  const email = req.params.user;
  const courseCode = req.params.courseCode;
  const easeRating = req.body.easeRating;
  const practicalityRating = req.body.practicalityRating;
  const enjoyabilityRating = req.body.enjoyabilityRating;
  const overallRating = req.body.overallRating;
  const comment = req.body.comment;
  const postDate = req.body.postDate;

  const { data, error } = await supabase
    .from("ratings")
    .select()
    .eq("email", email)
    .eq("course_code", courseCode);

  if (error) {
    res.status(500).json({ error: error });
  } else {
    if (data.length === 0) {
      const { error } = await supabase.from("ratings").insert({
        email: email,
        course_code: courseCode,
        ease_rating: easeRating,
        practicality_rating: practicalityRating,
        enjoyability_rating: enjoyabilityRating,
        overall_rating: overallRating,
        review: comment,
        date: postDate,
      });
      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.status(200).json({ success: "Rating posted" });
        console.log("Rating posted");
      }
    } else {
      res.status(500).json({ error: "Users are limited to 1 post per course" });
    }
  }
});

// PATCH RATING

router.patch("/update/:courseCode/:user", async (req, res) => {
  const email = req.params.user;
  const courseCode = req.params.courseCode;
  const easeRating = req.body.easeRating;
  const practicalityRating = req.body.practicalityRating;
  const enjoyabilityRating = req.body.enjoyabilityRating;
  const overallRating = req.body.overallRating;
  const comment = req.body.comment;

  const { data, error } = await supabase
    .from("ratings")
    .select()
    .eq("email", email)
    .eq("course_code", courseCode);
  if (error) {
    res.status(500).json({ error: error });
  } else {
    if (data.length === 1) {
      const { error } = await supabase
        .from("ratings")
        .update({
          ease_rating: easeRating,
          practicality_rating: practicalityRating,
          enjoyability_rating: enjoyabilityRating,
          overall_rating: overallRating,
          review: comment,
        })
        .eq("email", email)
        .eq("course_code", courseCode);

      if (error) {
        res.status(500).json({ error: error });
      } else {
        res.status(200).json({ success: "Rating posted" });
        console.log("Rating updated");
      }
    } else {
      res.status(500).json({ error: "Users are limited to 1 post per course" });
    }
  }
});

export default router;
