import express from "express";
import router from "./router";
import db from "./config/db";

async function connectDB() {
  try {
    await db.authenticate();
    console.log("Database connected successfully");
    await db.sync();
    console.log("Database synchronized successfully");
  } catch (error) {
    console.log(error);
    console.log("Error trying to connect to database");
  }
}

connectDB();
const app = express();

app.use("/", router);

export default app;
