const CryptocurrencyMD = require("../models/cryptocurrency");

module.exports = {
  get: async (req, res) => {
    const data = await CryptocurrencyMD.find().sort({ cmc_rank: 1 }).lean(true);
    return res.json({ data });
  }
}