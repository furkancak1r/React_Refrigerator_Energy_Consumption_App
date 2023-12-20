import express from "express";
import { sessionMiddleware } from "./middlewares/sessionMiddleware.js";
import { bodyParserMiddleware } from "./middlewares/bodyParserMiddleware.js";
import fileUpload from "express-fileupload";
import {
  loginFn,
  logout,
  controlFn,
  fetchTable,
  deleteFn,
  updateRowFn,
  columnNamesFn,
  addRowFn,
  fetchExactMatchSerialNo,
  addMdbFiles,
  fetchLanguage,
  updateEvaporatorPanFn,
  fetchTesterNamesFn,
  addNewTesterNameFn,
  deleteTesterNameFn,
} from "./functions/functions.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const port = process.env.PORT || 4000;
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(sessionMiddleware); 
app.options("*", (req, res) => {
  const allowedOrigins = [process.env.CLIENT_URL];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.send();
});

app.use(bodyParserMiddleware);
app.use(fileUpload());

app.post("/api/login", async (req, res) => {
  loginFn(req, res);
});
app.get("/api/test", async (req, res) => {
  res.status(200).send("test başarılı!");
});

app.post("/api/logout", (req, res) => {
  logout(req, res);
});

app.get("/api/admin/control", (req, res) => {
  controlFn(req, res);
});

app.post("/api/energy/fetchTable", (req, res) => {
  fetchTable(req, res);
});

app.post("/api/energy/fetchExactMatchSerialNo", (req, res) => {
  fetchExactMatchSerialNo(req, res);
});

app.delete("/api/energy/delete", (req, res) => {
  deleteFn(req, res);
});

app.put("/api/energy/updateRow", (req, res) => {
  updateRowFn(req, res);
});

app.get("/api/admin/columnNames", (req, res) => {
  columnNamesFn(req, res);
});

app.post("/api/admin/addRow", (req, res) => {
  addRowFn(req, res);
});

app.post("/api/admin/addMdbFiles", (req, res) => {
  addMdbFiles(req, res);
});

app.post("/api/language", (req, res) => {
  fetchLanguage(req, res);
});

app.post("/api/admin/updateEvaporatorPan", (req, res) => {
  updateEvaporatorPanFn(req, res);
});

app.post("/api/testerNames/addNewTesterName", (req, res) => {
  addNewTesterNameFn(req, res);
});
app.post("/api/testerNames/deleteTesterName", (req, res) => {
  deleteTesterNameFn(req, res);
});

app.get("/api/testerNames", (req, res) => {
  fetchTesterNamesFn(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  
  