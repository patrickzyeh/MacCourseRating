// Router for course API

import express from "express";
import supabase from "../db.js";
import env from "dotenv";

// Env Config

env.config();

// Express Routers

const router = express.Router();

// GET All Course

router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("courses").select();

  if (error) {
    res.status(500).json({ error: error });
  }
  if (data) {
    res.json(data);
  }
});

// GET Specific Course

router.get("/:course_code", async (req, res) => {
  const courseCode = req.params.course_code;
  const { data, error } = await supabase
    .from("courses")
    .select()
    .eq("course_code", courseCode);

  if (error) {
    res.status(500).json({ error: error });
  }
  if (data.length === 0) {
    res.status(500).json({ error: "CANNOT GET ID" });
  } else {
    res.json(data);
  }
});

export default router;
