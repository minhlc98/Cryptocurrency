const cron = require("node-cron");
const callNewData = require("./call-new-data");

const CallNewData = cron.schedule("0 */5 * * * *", async () => {
  console.log("running");
  await callNewData.start();
}, { scheduled: false });

module.exports = {
  start: () => {
    CallNewData.start();
  }
}