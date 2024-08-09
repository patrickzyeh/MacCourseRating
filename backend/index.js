import express from "express";
import cors from "cors";
import env from "dotenv";
import session from "express-session";
import passport from "passport";
import authRouter from "./routes/auth.js";
import courseRouter from "./routes/courses.js";
import ratingRouter from "./routes/rating.js";

// Initialize Express App

const app = express();
const port = process.env.PORT || 8000;

// Env Config

env.config();

// CORS Middleware

app.use(cors());

// Session Middleware

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      secure: true,
      httpOnly: false,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://maccourseratings.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// API Middlewares

app.use("/api/courses", courseRouter);

app.use("/auth", authRouter);

app.use("/api/ratings", ratingRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
