import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@utils/dbConnect";
import User from "@models/User";

dbConnect();

export default async function balance(req, res) {
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        if (
          !req.body.amount ||
          !Number.isInteger(req.body.amount) ||
          req.body.amount <= 0
        ) {
          return res.json({ error: true, message: "Please insert amount" });
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
        const updatedUser = await User.findOneAndUpdate(
          { username: userHeader.username },
          { $inc: { balance: req.body.amount } }
        );
        if (!updatedUser) {
          return res.json({ error: true, message: "Cannot update user" });
        }
        return res.json({ message: "Success", data: updatedUser });
      } catch (e) {
        console.log(e);
        return res.json({ error: true, message: "Error occurred!" });
      }
  }
  return res.json({ error: true, message: "Please use API carefully" });
}
