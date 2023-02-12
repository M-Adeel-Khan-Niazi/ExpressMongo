const { Transaction } = require("./model");

module.exports.getTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.aggregate([
      { $match: { account_id: req.body.account_id } },
      {
        $sum: {
          $cond: [
            { $eq: ["$tansactions.transaction_code", "sell"] },
            "$tansactions.amount",
            0,
          ],
        },
      },
      // {
      //   $project: {
      //     _id: 0,
      //     account_id: 1,
      //     total_amount_sold: {
      //       $cond: {
      //         if: { $eq: ["$tansactions.transaction_code", "sell"] },
      //         then: "$tansactions.amount",
      //         else: 0,
      //       },
      //     },
      //     // NegSentiment: {
      //     //   $cond: [{ $lt: ["$Sentiment", 0] }, "$Sentiment", 0],
      //     // },
      //   },
      // },
      // {
      //   $group: {
      //     _id: "$_id",
      //     total_amount_sold: { $sum: "$total_amount_sold" },
      //     // SumNegSentiment: { $sum: "$NegSentiment" },
      //   },
      // },
      // {
      //   $project: {
      //     account_id: "$account_id",
      //     total_amount_sold: { $sum: ["$transactions.amount"] },
      //     total_amount_bought: { $sum: ["$transactions.amount"] },
      //   },
      // },
    ]);
    return res
      .status(200)
      .json({ data: transaction, message: "Transaction fetched." });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
