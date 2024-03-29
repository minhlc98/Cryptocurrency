const express = require("express");
const router = express.Router();
const CryptocurrencyController = require("../controllers/cryptocurrency.controller");

router.get("/", CryptocurrencyController.get);
router.get("/:slug", CryptocurrencyController.getBySlug);

module.exports = router;