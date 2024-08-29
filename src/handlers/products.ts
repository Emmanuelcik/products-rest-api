import { Request, Response } from "express";
import Product from "../models/Product.model.js";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    res.status(200).json({ data: products });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (req: Request, res: Response) => {
  // old way
  //   const product = new Product(req.body);
  //   const savedProduct = await product.save();
  //   res.status(201).json(savedProduct);

  // Validation

  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};
