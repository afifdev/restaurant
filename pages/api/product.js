import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import Product from "@models/Product";
import User from "@models/User";
import dbConnect from "@utils/dbConnect";

dbConnect();

export default async function product(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.find();
        return res.json({ data: product });
      } catch (e) {
        return res.json({ error: true, message: "Error occurred!" });
      }
    case "POST":
      try {
        if (!req.headers.authorization) {
          return res.json({
            error: true,
            message: "Please provide headers",
          });
        }
        const token = req.headers.authorization.split("Bearer ")[1];
        if (!token) {
          return res.json({ error: true, message: "Token not found" });
        }
        const adminHeader = jwt.verify(token, process.env.JWT_SECRET);
        if (!adminHeader) {
          return res.json({ error: true, message: "Token not valid" });
        }
        const admin = await User.findOne({ username: adminHeader.username });
        if (!admin) {
          return res.json({ error: true, message: "Unrecognized" });
        }
        if (admin.role !== 2) {
          return res.json({ error: true, message: "Unauthorized" });
        }
        const isMatch = await compare(adminHeader.password, admin.password);
        if (!isMatch) {
          return res.json({ error: true, message: "Password mismatch" });
        }
        if (
          !req.body.name ||
          !req.body.price ||
          !req.body.stock ||
          req.body.name === "" ||
          !Number.isInteger(req.body.price) ||
          !Number.isInteger(req.body.stock)
        ) {
          return res.json({
            error: true,
            message: "Please fill out the fields",
          });
        }
        const isAlreadyExist = await Product.findOne({ name: req.body.name });
        if (isAlreadyExist) {
          return res.json({ error: true, message: "Product already in store" });
        }
        const newProduct = new Product({
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
        });
        const saveProduct = await newProduct.save();
        if (!saveProduct) {
          return res.json({
            error: true,
            message: "Product couldn't be saved",
          });
        }
        return res.json({ message: "Success" });
      } catch (e) {
        return res.json({ error: true, message: "Error occurred!" });
      }
    case "PUT":
      try {
        if (!req.headers.authorization) {
          return res.json({
            error: true,
            message: "Please provide headers",
          });
        }
        const token = req.headers.authorization.split("Bearer ")[1];
        if (!token) {
          return res.json({ error: true, message: "Token not found" });
        }
        const adminHeader = jwt.verify(token, process.env.JWT_SECRET);
        if (!adminHeader) {
          return res.json({ error: true, message: "Token not valid" });
        }
        const admin = await User.findOne({ username: adminHeader.username });
        if (!admin) {
          return res.json({ error: true, message: "Unrecognized" });
        }
        if (admin.role !== 2) {
          return res.json({ error: true, message: "Unauthorized" });
        }
        const isMatch = await compare(adminHeader.password, admin.password);
        if (!isMatch) {
          return res.json({ error: true, message: "Password mismatch" });
        }
        if (
          !req.body.id ||
          (req.body.name && req.body.name === "") ||
          (req.body.price && !Number.isInteger(req.body.price)) ||
          (req.body.stock && !Number.isInteger(req.body.stock))
        ) {
          return res.json({
            error: true,
            message: "Please fill out the fields",
          });
        }
        const isExist = await Product.findOne({ _id: req.body.id });
        if (!isExist) {
          return res.json({ error: true, message: "Product not in the store" });
        }
        const updatedProduct = await Product.findOneAndUpdate(
          { _id: req.body.id },
          {
            name: req.body.name === null ? undefined : req.body.name,
            price: req.body.price === null ? undefined : req.body.price,
            stock: req.body.stock === null ? undefined : req.body.stock,
          }
        );
        if (!updatedProduct) {
          return res.json({
            error: true,
            message: "Product couldn't be updated",
          });
        }
        return res.json({ message: "Success", data: updatedProduct });
      } catch (e) {
        return res.json({ error: true, message: "Error occurred!" });
      }
    case "DELETE":
      try {
        if (!req.headers.authorization) {
          return res.json({
            error: true,
            message: "Please provide headers",
          });
        }
        const token = req.headers.authorization.split("Bearer ")[1];
        if (!token) {
          return res.json({ error: true, message: "Token not found" });
        }
        const adminHeader = jwt.verify(token, process.env.JWT_SECRET);
        if (!adminHeader) {
          return res.json({ error: true, message: "Token not valid" });
        }
        const admin = await User.findOne({ username: adminHeader.username });
        if (!admin) {
          return res.json({ error: true, message: "Unauthorized" });
        }
        const isMatch = await compare(adminHeader.password, admin.password);
        if (!isMatch) {
          return res.json({ error: true, message: "Unauthorized" });
        }
        if (!req.body.id) {
          return res.json({
            error: true,
            message: "No specific product selected!",
          });
        }
        const deletedProduct = await Product.findOneAndDelete({
          _id: req.body.id,
        });
        if (!deletedProduct) {
          return res.json({
            error: true,
            message: "Product already not in store",
          });
        }
        return res.json({ message: "Success", data: deletedProduct });
      } catch (e) {
        return res.json({ error: true, message: "Error occurred!" });
      }
  }
  return res.json({ error: true, message: "Please use API carefully" });
}
