const fetch = require("node-fetch");
const _ = require("lodash");
const Promise = require("bluebird");
const cryptocurrencies = require("../list_cryptocurrency");
const CryptocurrencyMD = require("../models/cryptocurrency.model");
const HistoryMD = require("../models/history.model");

const API_URL = process.env.API_URL;

let justUsedApi1 = false;

const getApiKey = () => {
  if (!(process.env.API_KEY_1 && process.env.API_KEY_2)) return null;

  if (process.env.API_KEY_1 && !process.env.API_KEY_2) return process.env.API_KEY_1;

  if (!process.env.API_KEY_1 && process.env.API_KEY_2) return process.env.API_KEY_2;

  if (justUsedApi1) {
    justUsedApi1 = false;
    return process.env.API_KEY_2;
  } else {
    justUsedApi1 = true;
    return process.env.API_KEY_1;
  } 
}

module.exports = {
  start: async () => {
    const API_KEY = getApiKey();
    if(!API_KEY || !API_URL) {
      console.log("Not found API_KEY and API_URL");
      return;
    }
    const results = await fetch(API_URL, {
      method: "get",
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
      json: true,
      gzip: true,
    }).then((res) => res.json());
    const data = _.intersectionWith(
      results.data,
      cryptocurrencies,
      (a, b) =>
        _.toLower(a.name) === _.toLower(b.name) &&
        _.toLower(a.symbol) === _.toLower(b.symbol)
    );
    await Promise.map(
      data,
      async (crypto) => {
        const cryptocurrency = {
          id: crypto.id,
          name: crypto.name,
          slug: crypto.slug,
          symbol: crypto.symbol,
          date_added: crypto.date_added,
          circulating_supply: crypto.circulating_supply,
          total_supply: crypto.total_supply,
          cmc_rank: crypto.cmc_rank,
          market_cap: _.get(crypto, "quote['USD'].market_cap"),
          price_usd: _.get(crypto, "quote['USD'].price"),
          percent_change_1h: _.get(crypto, "quote['USD'].percent_change_1h"),
          percent_change_24h: _.get(crypto, "quote['USD'].percent_change_24h"),
          percent_change_7d: _.get(crypto, "quote['USD'].percent_change_7d"),
          last_updated: crypto.last_updated,
        };
        const history = {
          id: crypto.id,
          num_market_pairs: crypto.num_market_pairs,
          tags: crypto.tags,
          max_supply: crypto.max_supply,
          circulating_supply: crypto.circulating_supply,
          total_supply: crypto.total_supply,
          platform: crypto.platform,
          cmc_rank: crypto.cmc_rank,
          last_updated: crypto.last_updated,
          currency: "USD",
          price: _.get(crypto, "quote['USD'].price"),
          volume_24h: _.get(crypto, "quote['USD'].volume_24h"),
          percent_change_1h: _.get(crypto, "quote['USD'].percent_change_1h"),
          percent_change_24h: _.get(crypto, "quote['USD'].percent_change_24h"),
          percent_change_7d: _.get(crypto, "quote['USD'].percent_change_7d"),
          market_cap: _.get(crypto, "quote['USD'].market_cap"),
          history_created_at: new Date()
        };

        const History = new HistoryMD(history);

        await Promise.all([
          CryptocurrencyMD.findOneAndUpdate(
            { id: cryptocurrency.id },
            cryptocurrency,
            {
              new: true,
              lean: true,
              upsert: true, // Make this update into an upsert
            }
          ),
          History.save()
        ]);
      },
      { concurrency: 3 }
    );
  },
};
