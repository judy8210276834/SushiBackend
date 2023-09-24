var express = require("express");
var router = express.Router();
var initDB = require("../models/connection_db");

let db = null;
db = initDB;

const GerProduct = require("../controllers/product/get_controller.js");

getProduct = new GerProduct();

router.get("/product", function (req, res) {
  getProduct.getAllProduct(req, res);
});

module.exports = router;
