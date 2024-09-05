import { exit } from "node:process";
import db from "../config/db.ts";

const clearDatabase = async () => {
  try {
    await db.sync({ force: true });
    console.log("Database cleared successfully");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDatabase();
}
