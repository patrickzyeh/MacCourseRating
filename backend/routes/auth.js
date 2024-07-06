// Router for authentication (signup, login, verify)

import express from "express";
import env from "dotenv";
import pg from "pg";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";

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

// Express Router

const router = express.Router();

// Google Auth Page

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Redirect to app

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successReturnToOrRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/",
  })
);

// Log user out

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
    res.redirect("http://localhost:3000/");
  });
});

// OAUTH

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email) VALUES ($1)",
            [profile.email]
          );
          cb(null, newUser.rows[0]);
        } else {
          cb(null, result.rows[0]);
        }
      } catch (err) {
        cb(err);
      }
    }
  )
);

// Serialize

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

export default router;
