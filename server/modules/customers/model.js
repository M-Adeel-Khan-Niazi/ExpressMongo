const mongoose = require("mongoose");
const { Account } = require("../accounts/model");

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  tier_and_details: {
    required: false,
  },
  accounts: {
    type: { type: [Number], ref: Account.modelName, field: "account_id" },
  },
});

const Customer = mongoose.model("customers", customerSchema);
exports.Customer = Customer;
