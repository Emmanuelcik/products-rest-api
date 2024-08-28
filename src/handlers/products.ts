import { Request, Response } from "express";
import Product from "../models/Product.model.js";
export const createProduct = async (req: Request, res: Response) => {
  // old way
  //   const product = new Product(req.body);
  //   const savedProduct = await product.save();
  //   res.status(201).json(savedProduct);

  const product = await Product.create(req.body);
  res.status(200).json(product);
};
