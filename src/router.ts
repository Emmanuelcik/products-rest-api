import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvaiability,
  deleteProduct,
} from "./handlers/products.ts";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware/index.ts";

const PRODUCTS_API_PATH = "/api/products";

const app = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The product name
 *          example: "Mouse"
 *        price:
 *          type: integer
 *          description: The cost of the product
 *          example: 200
 *        availability:
 *          type: boolean
 *          description: is the product availability or not
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Gets all products
 *    tags:
 *      - Products
 *    description: Returns all products
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *
 */
app.get("/api/products", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by id
 *    tags:
 *      - Products
 *    description: Returns an specific product by its id
 *    parameters:
 *    - in: path
 *      name: id
 *      description: the Id of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request
 *
 */
app.get(
  `${PRODUCTS_API_PATH}/:id`,
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products/:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description: create a new product in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Ergonomic Mouse"
 *              price:
 *                type: number
 *                example: 499
 *    responses:
 *      201:
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request
 *
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates an existing product
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: the Id of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Ergonomic Mouse"
 *              price:
 *                type: number
 *                example: 499
 *              availability:
 *                type: boolean
 *                description: is the product availability or not
 *                example: true
 *    responses:
 *      200:
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request
 *
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Updates product availability
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: the Id of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Product updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request
 *
 */
app.patch(
  `${PRODUCTS_API_PATH}/:id`,
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  updateAvaiability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: removes an existing product
 *    tags:
 *      - Products
 *    description: Removes an existing product from the database
 *    parameters:
 *    - in: path
 *      name: id
 *      description: the Id of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Product delted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: "Product deleted successfully"
 *      404:
 *        description: Product not found
 *      400:
 *        description: Bad request
 *
 */
app.delete(
  `${PRODUCTS_API_PATH}/:id`,
  param("id").isInt().withMessage("Invalid Id"),
  handleInputErrors,
  deleteProduct
);
export default app;
