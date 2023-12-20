import mysql from "mysql2/promise.js";
import config from "./dbConfig.js";

const pool = await mysql.createPool(config);

pool
  .getConnection()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error: ", err);
  });

export { pool };