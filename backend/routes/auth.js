// Router for authentication (signup, login, verify)

import express from "express";
import env from "dotenv";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import supabase from "../db.js";

// Env Config

env.config();

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
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", profile.email);
      if (error) {
        cb(error);
      }
      if (data.length === 0) {
        console.log("Creating new user");
        const { newUserData, error } = await supabase.from("users").insert([
          {
            email: profile.email,
          },
        ]);
        if (error) {
          cb(error);
        }
        cb(null, newUserData);
      } else {
        cb(null, data[0]);
      }
    }
  )
);

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
