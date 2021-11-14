const mongoose = require("mongoose");
const Int32 = require("mongoose-int32").loadType(mongoose);

const Transaction = new mongoose.Schema({
  user_id: String,
  courier_id: String,
  product: [{ prd_id: String, prd_price: Int32, amount: Number }],
  location: String,
  ship_cost: Int32,
  total_price: Int32,
  status: Number,
});

module.exports =
  mongoose.models.Transaction || mongoose.model("Transaction", Transaction);
