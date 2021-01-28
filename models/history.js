const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = Schema({
  id: { type: Number, required: true },
  num_market_pairs: { type: Number, default: 0 },
  tags: [],
  max_supply: { type: Number, default: 0 },
  circulating_supply: { type: Number, default: 0 },
  total_supply: { type: Number, default: 0 },
  platform: {
    id: { type: Number, default: null },
    name: { type: String, default: null },
    symbol: { type: String, default: null },
    slug: { type: String, default: null },
    token_address: { type: String, default: null },
  },
  cmc_rank: { type: Number, required: true },
  last_updated: { type: Date, default: Date.now },
  currency: { type: String, default: "USD" },
  price: { type: Number, required: true },
  volume_24h: { type: Number, required: true },
  percent_change_1h: { type: Number, required: true },
  percent_change_24h: { type: Number, required: true },
  percent_change_7d: { type: Number, required: true },
  market_cap: { type: Number, required: true },
}, { versionKey: false });


const INDEX_SCHEMA_FILTER_1 = { id: 1, last_updated: -1 };

historySchema.index(INDEX_SCHEMA_FILTER_1);

module.exports = mongoose.model("History", historySchema);
