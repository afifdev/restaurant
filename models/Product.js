const mongoose = require("mongoose");
const Int32 = require("mongoose-int32").loadType(mongoose);

const Product = new mongoose.Schema({
  name: String,
  price: Int32,
  stock: Number,
});

module.exports = mongoose.models.Product || mongoose.model("Product", Product);
