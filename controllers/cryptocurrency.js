const CryptocurrencyMD = require("../models/cryptocurrency");

module.exports = {
  get: async (req, res) => {
    const data = await CryptocurrencyMD.find().lean(true);
    return res.json({ data });
  }
}