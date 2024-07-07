import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import courseRouter from "./routes/courses.js";
import session from "express-session";
import passport from "passport";
import authRouter from "./routes/auth.js";

// Initialize Express App

const app = express();
const port = 8000;

// Env Config

env.config();

// Body Parser Middleware

app.use(bodyParser.json());

// CORS Middleware

app.use(cors());

// Session Middleware

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

// API Middlewares

app.use("/api/courses", courseRouter);

app.use("/", authRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
