import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@utils/dbConnect";
import User from "@models/User";
import Product from "@models/Product";
import { isValidObjectId } from "mongoose";
const ObjectId = require("mongoose").Types.ObjectId;
import Transaction from "@models/Transaction";

dbConnect();

export default async function transaction(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
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
        const transaction = await Transaction.find(
          user.role === 0 ? { user_id: user._id } : { courier_id: user._id }
        );
        if (!transaction) {
          return res.json({
            error: true,
            message: "Failed getting transaction",
          });
        }
        return res.json({
          message: "Success",
          role: user.role,
          data: transaction,
        });
      } catch (e) {
        console.log(e);
        return res.json({ error: true, message: "Error occurred" });
      }
    case "POST":
      try {
        if (
          !req.body.prd_list ||
          req.body.prd_list.length === 0 ||
          !Array.isArray(req.body.prd_list)
        ) {
          return res.json({
            error: true,
            message: "Please fill out the fields",
          });
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
        for (let i = 0; i < req.body.prd_list.length; i++) {
          if (!isValidObjectId(Object.keys(req.body.prd_list[i])[0])) {
            return res.json({ error: true, message: "Invalid identifier" });
          }
        }
        const product = await Product.aggregate([
          {
            $match: {
              _id: {
                $in: req.body.prd_list.map((k) => {
                  return ObjectId(Object.keys(k)[0]);
                }),
              },
            },
          },
          {
            $group: {
              _id: null,
              total_price: { $sum: "$price" },
              prd: {
                $push: {
                  prd_id: "$_id",
                  prd_price: "$price",
                  stock: "$stock",
                },
              },
            },
          },
        ]);
        const r = product[0].prd.filter(
          (p) =>
            !req.body.prd_list.some((p2) => {
              if (
                p.prd_id.equals(Object.keys(p2)[0]) &&
                p.stock >= p2[Object.keys(p2)[0]]
              ) {
                p["amount"] = p2[Object.keys(p2)[0]];
                return true;
              }
              return false;
            })
        );
        if (r.length > 0) {
          return res.json({ error: true, message: "Stock limited" });
        }
        for (let i = 0; i < req.body.prd_list.length; i++) {
          let updateProduct = await Product.findOneAndUpdate(
            { _id: ObjectId(Object.keys(req.body.prd_list[i])[0]) },
            {
              $inc: {
                stock:
                  -req.body.prd_list[i][Object.keys(req.body.prd_list[i])[0]],
              },
            }
          );
          if (!updateProduct) {
            return res.json({ error: true, message: "Cannot update product" });
          }
        }
        const transaction = new Transaction({
          user_id: user._id,
          courier_id: "618f389d4f43b37275459063",
          product: product[0].prd,
          total_price: product[0].total_price,
          status: 0,
        });
        const saveTransaction = await transaction.save();
        if (!saveTransaction) {
          return res.json({ error: true, message: "Cannot save transaction" });
        }
        return res.json({ message: "Success", data: saveTransaction });
      } catch (e) {
        console.log(e);
        return res.json({ error: true, message: "Error occurred!" });
      }
    case "PUT":
      try {
        if (!req.body.transaction_id || req.body.transaction_id === "") {
          return res.json({
            error: true,
            message: "Please fill out the fields",
          });
        }
        if (!isValidObjectId(req.body.transaction_id)) {
          return res.json({ error: true, message: "Invalid identifier" });
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
        if (user.role !== 1) {
          return res.json({ error: true, message: "Unauthorized" });
        }
        const isMatch = await compare(userHeader.password, user.password);
        if (!isMatch) {
          return res.json({ message: "Password mismatch" });
        }
        const transaction = await Transaction.findOneAndUpdate(
          { _id: ObjectId(req.body.transaction_id), courier_id: user._id },
          {
            status: 1,
          }
        );
        if (!transaction) {
          return res.json({
            error: true,
            message: "Cannot update transaction",
          });
        }
        return res.json({ message: "Success", data: transaction });
      } catch (e) {
        console.log(e);
        return res.json({ error: true, message: "Error occurred!" });
      }
  }
  return res.json({ error: true, message: "Please use API carefully" });
}
