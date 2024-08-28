import express from "express";
import router from "./router.js";
import db from "./config/db.js";
import colors from "colors";

async function connectDB() {
  try {
    await db.authenticate();
    console.log(colors.bgGreen.white("Database connected successfully"));
    await db.sync();
    console.log("Database synchronized successfully");
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed.white("Error trying to connect to database"));
  }
}

connectDB();
const app = express();

// Get data from request object
app.use(express.json());
app.use("/", router);

export default app;
