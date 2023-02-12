const { Transaction } = require("./model");

module.exports.getTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.aggregate([
      { $match: { account_id: req.body.account_id } },
      {
        $addFields: {
          total_amount_sold: {
            $filter: {
              input: "$transactions",
              cond: { $eq: ["$$this.transaction_code", "sell"] },
            },
          },
          total_amount_bought: {
            $filter: {
              input: "$transactions",
              cond: { $eq: ["$$this.transaction_code", "buy"] },
            },
          },
        },
      },
      {
        $addFields: {
          total_amount_sold: { $sum: "$total_amount_sold.amount" },
          total_amount_bought: { $sum: "$total_amount_bought.amount" },
        },
      },

      {
        $project: {
          _id: 0,
          total_amount_sold: 1,
          total_amount_bought: 1,
        },
      },
    ]);
    return res
      .status(200)
      .json({ data: transaction[0], message: "Transaction fetched." });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
