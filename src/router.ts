import { Router } from "express";
import { createProduct } from "./handlers/products.js";

const app = Router();
app.get("/", (req, res) => {
  res.send(200);
});

app.post("/api/products", createProduct);

export default app;
