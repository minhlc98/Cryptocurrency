const cron = require("node-cron");
const config = require('../config');
const getNewData = require("./get-new-data");

const getNewDataCron = cron.schedule(config.cron_time.get_new_data, async () => {
  if (!global.gettingNewData) {
    global.gettingNewData = true;
    await getNewData.start();
    global.gettingNewData = false;
  }
}, { scheduled: false });

module.exports = {
  start: () => {
    if (config.cron_active.get_new_data) {
      getNewDataCron.start();
    }
  }
}