const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const crons = require("./crons");

const PORT = process.env.PORT || 8080;
const DB_CONNECTION = process.env.DB_CONNECTION || "mongodb://localhost:27017/myapp";

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

app.use(cors());
app.use("/", require("./routers/cryptocurrency"));

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
