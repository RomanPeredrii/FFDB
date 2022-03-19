const log = console.log;
const date = require("../controllers/date");

module.exports = function downtime(cont) {
    if (cont.driver) {
        cont.driver = cont.driver.trim();
        if (!cont.driver.length) {
        return date(cont.vessel);
        }
    } else {
        return date(cont.vessel);
    }
};