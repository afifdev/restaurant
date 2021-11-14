import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@utils/dbConnect";
import User from "@models/User";

dbConnect();

export default async function login(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        if (!req.body.username || !req.body.password) {
          return res.json({
            error: true,
            message: "Please fill out the fields",
          });
        }
        const user = await User.findOne({ username: req.body.username });
        if (user) {
          const isMatch = await compare(req.body.password, user.password);
          if (isMatch) {
            return res.json({
              message: "success",
              data: {
                username: user.username,
                role: user.role,
                cart: user.role === 0 ? user.cart : [],
                token: jwt.sign(
                  { username: user.username, password: req.body.password },
                  process.env.JWT_SECRET
                ),
              },
            });
          }
          return res.json({ message: "Password mismatch" });
        }
        return res.json({ message: "User not found" });
      } catch (e) {
        return res.json({ error: true, message: "Error occurred!" });
      }
  }
  return res.json({ error: true, message: "Please use API carefully" });
}
