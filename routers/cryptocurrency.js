const express = require("express");
const router = express.Router();
const CryptocurrencyController = require("../controllers/cryptocurrency");

router.get("/", CryptocurrencyController.get);

module.exports = router;