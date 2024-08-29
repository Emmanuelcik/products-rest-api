import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvaiability,
  deleteProduct,
} from "./handlers/products.js";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware/index.js";

const PRODUCTS_API_PATH = "/api/products";

const app = Router();

app.get("/api/products", getProducts);

app.get(
  `${PRODUCTS_API_PATH}/:id`,
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  getProductById
);

app.post(
  PRODUCTS_API_PATH,
  body("name").notEmpty().withMessage("Product name is required"),
  body("price")
    .isNumeric()
    .withMessage("Invalid price")
    .notEmpty()
    .withMessage("Product price is required"),
  handleInputErrors,
  createProduct
);

app.put(
  `${PRODUCTS_API_PATH}/:id`,
  param("id").isInt().withMessage("Invalid Id"),
  body("name").notEmpty().withMessage("Product name is required"),
  body("price")
    .isNumeric()
    .withMessage("Invalid price")
    .notEmpty()
    .withMessage("Product price is required"),
  body("availability").isBoolean().withMessage("Invalid Product availability"),
  handleInputErrors,
  updateProduct
);

app.patch(
  `${PRODUCTS_API_PATH}/:id`,
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  updateAvaiability
);

app.delete(
  `${PRODUCTS_API_PATH}/:id`,
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  deleteProduct
);
export default app;
