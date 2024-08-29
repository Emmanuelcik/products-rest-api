import { Router } from "express";
import { createProduct } from "./handlers/products.js";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/index.js";
const app = Router();
app.get("/", (req, res) => {
  res.send(200);
});

app.post(
  "/api/products",
  body("name").notEmpty().withMessage("Product name is required"),
  body("price")
    .isNumeric()
    .withMessage("Invalid price")
    .notEmpty()
    .withMessage("Product price is required"),
  handleInputErrors,
  createProduct
);

export default app;
