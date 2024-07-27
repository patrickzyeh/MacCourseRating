import express from "express";
import cors from "cors";
import env from "dotenv";
import session from "express-session";
import passport from "passport";
import authRouter from "./routes/auth.js";
import courseRouter from "./routes/courses.js";
import ratingRouter from "./routes/rating.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Env Config

env.config();

// Initialize Express App

const app = express();
const PORT = process.env.PORT || 8000;

// Heroku Setup

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

app.use(express.static(path.join(__dirname, "frontend/build")));

if (process.env.NODE_ENV === "production") {
  //Serve Static Content
  app.use(express.static(path.join(__dirname, "frontend/build")));
}

// CORS Middleware

app.use(cors());

// Session Middleware

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// API Middlewares

app.use("/api/courses", courseRouter);

app.use("/auth", authRouter);

app.use("/api/ratings", ratingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
