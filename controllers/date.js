const moment = require("moment");

module.exports = function data(vess) {
  let ATB, vessel, dateNOW, dateTimeNOW, downtime, UTCdate;
  if (vess) {
    ATB = new Date(3600000*2+ (new Date(moment(vess.substring(0, 10).trim(), "DD.MM.YYYY")).valueOf()));
    UTCdate = ATB;
    vessel = vess.substring(10).trim();
    dateTimeNOW = moment().locale("uk").format("L LTS");
    dateNOW = moment().locale("uk").format("L");
    downtime = Math.floor((new Date(moment()) - ATB) / 86400000);
  } else {
    dateTimeNOW = moment().locale("uk").format("L LTS");
    dateNOW = moment().locale("uk").format("L");
  }

  return { ATB, vessel, dateNOW, dateTimeNOW, downtime, UTCdate };
};
