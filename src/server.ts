import express from "express";
import router from "./router.ts";
import swaggerUi from "swagger-ui-express";
import db from "./config/db.ts";
import colors from "colors";
import swaggerSpect, { swaggerUiOptions } from "./config/swagger.ts";

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

// Docs
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpect, swaggerUiOptions)
);

export default app;
