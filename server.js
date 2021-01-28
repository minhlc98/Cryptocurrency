const express = require("express");
const mongoose = require("mongoose");
const app = express();
const CryptocurrencyMD = require("./models/cryptocurrency");
require("dotenv").config();
const crons = require("./crons");

const PORT = process.env.PORT || 8080;
const DB_CONNECTION = process.env.DB_CONNECTION;

mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      throw err;
    }
    crons.start();
  }
);

app.get("/", async (req, res) => {
  const data = await CryptocurrencyMD.find()
    .sort({ cmc_rank: 1 })
    .limit(50)
    .lean(true);
  return res.json({
    success: "OK",
    data,
  });
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
