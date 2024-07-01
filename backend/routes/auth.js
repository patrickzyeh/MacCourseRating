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

// OAUTH Setup

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/oauth2/redirect/google",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        // Insert User Email Into SQL Database if User is New
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email) VALUES ($1)",
            [profile.email]
          );
          cb(null, newUser.rows[0]);
        }
        // Already Existing User
        else {
          cb(null, result.rows[0]);
        }
      } catch (err) {
        cb(err);
      }
    }
  )
);

// Serialize

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// Express Router

const router = express.Router();

// GET request to redirect to authentication page

router.get("/login", function (req, res, next) {
  res.render(""); // HERE WE WILL HAVE THE SIGN IN BUTTON IN FRONTEND THAT REDIRECTS TO AUTH PAGE
});

// GET request to authentication page

router.get(
  "/login/federated/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// GET request to redirect to app

router.get(
  "/oauth2/redirect/google", // REDIRECT TO APP WHEN FRONTEND IS CODED
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  })
);

// POST request to log user out

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
