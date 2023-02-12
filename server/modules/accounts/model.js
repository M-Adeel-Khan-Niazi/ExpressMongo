const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  products: {
    type: [mongoose.Schema.Types.String],
    required: false,
  },
});

const Account = mongoose.model("accounts", accountSchema);
exports.Account = Account;
