// sessionMiddleware.js
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();


const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 3600000, // 1 saat
  },
});

export{ sessionMiddleware};
