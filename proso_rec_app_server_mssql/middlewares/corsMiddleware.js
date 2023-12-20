// corsMiddleware.js
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const corsMiddleware = cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
});
export{corsMiddleware};
