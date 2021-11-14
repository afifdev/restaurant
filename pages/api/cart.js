import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@utils/dbConnect";
import User from "@models/User";
import Product from "@models/Product";

dbConnect();

export default async function cart(req, res) {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        if (!req.body.prd_id || req.body.prd_id === "") {
          return res.json({ error: true, message: "Please insert product" });
        }
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
        const userHeader = jwt.verify(token, process.env.JWT_SECRET);
        if (!userHeader) {
          return res.json({ error: true, message: "Token not valid" });
        }
        const user = await User.findOne({ username: userHeader.username });
        if (!user) {
          return res.json({ message: "User not found" });
        }
        const isMatch = await compare(userHeader.password, user.password);
        if (!isMatch) {
          return res.json({ message: "Password mismatch" });
        }
        const pushedProduct = await Product.findOne({ _id: req.body.prd_id });
        if (!pushedProduct) {
          return res.json({ error: true, message: "Product not found" });
        }
        const updatedUser = await User.findOneAndUpdate(
          { username: userHeader.username, cart: { $nin: [req.body.prd_id] } },
          { $push: { cart: req.body.prd_id } }
        );
        if (!updatedUser) {
          return res.json({ error: true, message: "Cannot update user" });
        }
        return res.json({ message: "Success" });
      } catch (e) {
        console.log(e);
        return res.json({ error: true, message: "Error occurred!" });
      }
    case "DELETE":
      try {
        if (!req.body.prd_id || req.body.prd_id === "") {
          return res.json({ error: true, message: "Please insert product" });
        }
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
        const userHeader = jwt.verify(token, process.env.JWT_SECRET);
        if (!userHeader) {
          return res.json({ error: true, message: "Token not valid" });
        }
        const user = await User.findOne({ username: userHeader.username });
        if (!user) {
          return res.json({ message: "User not found" });
        }
        const isMatch = await compare(userHeader.password, user.password);
        if (!isMatch) {
          return res.json({ message: "Password mismatch" });
        }
        const pulledProduct = await Product.findOne({ _id: req.body.prd_id });
        if (!pulledProduct) {
          return res.json({ error: true, message: "Product not found" });
        }
        const updatedUser = await User.findOneAndUpdate(
          { username: userHeader.username, cart: { $in: [req.body.prd_id] } },
          { $pull: { cart: req.body.prd_id } }
        );
        if (!updatedUser) {
          return res.json({ error: true, message: "Cannot update user" });
        }
        return res.json({ message: "Success" });
      } catch (e) {
        return res.json({ error: true, message: "Error occurred!" });
      }
  }
  return res.json({ error: true, message: "Please use API carefully" });
}
