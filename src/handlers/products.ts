import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import Product from "../models/Product.model.js";
export const createProduct = async (req: Request, res: Response) => {
  // old way
  //   const product = new Product(req.body);
  //   const savedProduct = await product.save();
  //   res.status(201).json(savedProduct);

  // Validation

  await check("name")
    .notEmpty()
    .withMessage("Product name is required")
    .run(req);
  await check("price")
    .isNumeric()
    .withMessage("Invalid price")
    .notEmpty()
    .withMessage("Product price is required")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const product = await Product.create(req.body);
  res.status(200).json(product);
};
