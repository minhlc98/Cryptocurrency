const cron = require("node-cron");
const callNewData = require("./call-new-data");

const CallNewData = cron.schedule("0 */5 * * * *", async () => {
  if (!global.updatingNewData) {
    global.updatingNewData = true;
    await callNewData.start();
    global.updatingNewData = false;
  }
}, { scheduled: false });

module.exports = {
  start: () => {
    if (process.env.CALL_NEW_DATA) {
      CallNewData.start();
    }
  }
}