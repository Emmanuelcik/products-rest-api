import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
} from "./handlers/products.js";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware/index.js";

const app = Router();

app.get("/api/products", getProducts);
app.get(
  "/api/products/:id",
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  getProductById
);

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
