const { Account } = require("../accounts/model");
const { Transaction } = require("../transactions/model");
const { Customer } = require("./model");

module.exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.aggregate([
      { $match: { username: req.body.user_name } },
      {
        $lookup: {
          from: Account.modelName,
          localField: "accounts",
          foreignField: "account_id",
          as: "accounts",
          pipeline: [
            {
              $project: {
                products: 0,
              },
            },
          ],
        },
      },
      {
        $unwind: "$accounts",
      },
      {
        $lookup: {
          from: Transaction.modelName,
          localField: "accounts.account_id",
          foreignField: "account_id",
          as: "accounts.transactions",
          pipeline: [
            {
              $project: {
                transaction_count: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$accounts.transactions",
      },
      {
        $set: {
          accounts: {
            account_id: "$accounts.account_id",
            limit: "$accounts.limit",
            transaction_count: "$accounts.transactions.transaction_count",
          },
        },
      },
      {
        $unset: "accounts.transactions",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          email: { $first: "$email" },
          birthdate: { $first: "$birthdate" },
          accounts: { $push: "$accounts" },
        },
      },
    ]);
    return res
      .status(200)
      .json({ data: customer[0], message: "Customer fetched." });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
