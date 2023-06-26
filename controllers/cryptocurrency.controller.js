const CryptocurrencyMD = require("../models/cryptocurrency.model");

module.exports = {
  get: async (req, res) => {
    const data = await CryptocurrencyMD.find().sort({ cmc_rank: 1 }).lean(true);
    return res.json(data);
  },
  getBySlug: async (req, res) => {
    const slug = req.body.slug;
    const data = await CryptocurrencyMD.findOne({ slug }).lean(true);
    return res.json(data);
  }
}