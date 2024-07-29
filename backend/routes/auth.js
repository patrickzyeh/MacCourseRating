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

// Google OAUTH

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
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

// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/auth/google/callback",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     async (accessToken, refreshToken, profile, cb) => {
//       const { data, error } = await supabase
//         .from(users)
//         .select()
//         .where("email", profile.email);

//       if (error) {
//         res.status(500).json({ error: error });
//       }
//       if (data) {
//         res.json(data);
//       }
//     }
//   )
// );

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// Routes

const router = express.Router();

router.get("/login/success", (req, res) => {
  res.status(200).json({
    success: true,
    message: "successful",
    user: req.user,
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/",
  })
);

export default router;
