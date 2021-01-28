const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaCryptocurrency = Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    symbol: { type: String, required: true },
    date_added: { type: Date, required: true },
    circulating_supply: { type: Number, required: true },
    cmc_rank: { type: Number, required: true },
    price_usd: { type: Number, required: true },
    percent_change_1h: { type: Number, required: true },
    percent_change_24h: { type: Number, required: true },
    percent_change_7d: { type: Number, required: true },
    app_created_at: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const INDEX_SCHEMA_FILTER_1 = { id: 1 };
const INDEX_SCHEMA_FILTER_2 = { cmc_rank: 1 };

schemaCryptocurrency.index(INDEX_SCHEMA_FILTER_1);
schemaCryptocurrency.index(INDEX_SCHEMA_FILTER_2);

module.exports = mongoose.model("Cryptocurrency", schemaCryptocurrency);
