const express = require("express");
const CustomerController = require("./controller");
const customerRoutes = express.Router();

customerRoutes.post("/customer", CustomerController.getCustomer);
module.exports = customerRoutes;
