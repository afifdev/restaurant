import { hash } from "bcrypt";
import dbConnect from "@utils/dbConnect";
import User from "@models/User";

dbConnect();

export default async function register(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        if (!req.body.username || !req.body.password || !req.body.name) {
          return res.json({
            error: true,
            message: "Please fill out the fields",
          });
        }
        const isUsernameExist = await User.findOne({
          username: req.body.username,
        });
        if (isUsernameExist) {
          return res.json({
            message: "Username already exist",
          });
        }
        const user = new User({
          name: req.body.name,
          username: req.body.username,
          password: await hash(req.body.password, 12),
          role: 0,
          balance: 0,
          cart: [],
        });
        const savedUser = await user.save();
        if (!savedUser) {
          return res.json({ error: true, message: "Cannot save user" });
        }
        return res.json({ message: "Success" });
      } catch (e) {
        return res.json({ error: true, message: "Error occurred!" });
      }
  }
  return res.json({ error: true, message: "Please use API carefully" });
}
