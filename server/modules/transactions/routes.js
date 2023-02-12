const express = require("express");
const TransactionController = require("./controller");
const transactionRoutes = express.Router();

transactionRoutes.post("/transactions", TransactionController.getTransactions);
module.exports = transactionRoutes;
