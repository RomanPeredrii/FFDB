const log = console.log;
const { Router } = require("express");
const router = Router();
const Container = require("../models/container");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "./buffer" });
const xlsx = require("xlsx");
const fs = require("fs");
const auth = require("../middleware/auth");
const date = require("../controllers/date");

log(date().dateNOW);



/** SERVISE **/

// async function changeCollection () {
//   const containers = await Container.find();
//   containers.forEach(async (cont) => {
//     cont.date = date(cont.vessel).ATB;
//     log(cont.date, cont.vessel);
//     await Container.findByIdAndUpdate(cont._id, cont);

//   });
// }



router.get("/", auth, async (req, res) => {
  /******* get all containers here *******/
  log("get all containers here");
  try {
    const containers = await Container.find();
    containers.forEach((cont) => {
      if (cont.driver) {
        cont.driver = cont.driver.trim();
        if (!cont.driver.length) {
          cont.downtime = date(cont.vessel).downtime;
        }
      } else {
        cont.downtime = date(cont.vessel).downtime;
      }
    });

    res.render("containers", {
      activeUser: req.session.user.name,
      title: "Containers",
      place: "Containers DB",
      isContainers: true,
      containers,
    });
  } catch (error) {
    log("GET ALL CONTAINERS ERROR", error);
  }
});

router.get("/planning", auth, async (req, res) => {
  /******* get all containers without drivers *******/
  // log("here containers for planning");
  try {
    const containersForPlanning = await Container.find({ driver: "" });
    res.render("planning", {
      activeUser: req.session.user.name,
      title: "Planning",
      place: date().dateNOW,
      isPlanning: true,
      containersForPlanning,
    });
  } catch (error) {
    log("GET ALL CONTAINERS WITHOUT DRIVERS ERROR", error);
  }
});

router.post("/add-many", auth, upload.single("file"), async (req, res) => {
  const file = path.join(__dirname, "..", req.file.path);
  const wb = xlsx.readFile(file);
  const ws = wb.Sheets[wb.SheetNames[0]];
  let data = xlsx.utils.sheet_to_json(ws);
  const fields = {
    [`Клиент`]: `client`,
    [`POL`]: `POL`,
    [`POD`]: `POD`,
    [`Судозаход`]: `vessel`, // NEED TO PARSE DATE & VESSEL
    [`Линия`]: `line`,
    [`К-во 20`]: `20`,
    [`К-во 40`]: `40`,
    [`Коносамент`]: `BL`,
    [`Список контейнеров`]: `number`,
    [`driver`]: `driver`, // NEED TO ADD DATE OF LOADING
    [`FD`]: `FD`,
    [`weight`]: `weight`,
    [`cargo`]: `cargo`,
    [`comments`]: `comments`,
    [`number`]: `number`,
    [`client`]: `client`,
    [`size`]: `size`,
  };
  let newData = [];
  let rawData = [];
  data.map((record) => {
    Object.keys(record).forEach((field) => {
      if (fields[field.toString().trim()]) {
        if (
          record[fields[field.toString().trim()]] !=
          record[field].toString().trim()
        ) {
          record[fields[field.toString().trim()]] = record[field]
            .toString()
            .trim();
        }
      } else {
        delete record[field];
      }
    });
    if (record["20"]) {
      record.size = `20`;
      delete record["20"];
    }
    if (record["40"]) {
      record.size = `40`;
      delete record["40"];
    }
    if (record.size > 1) {
      record.number
        .trim()
        .split(" ")
        .map((number) => {
          record.number = number;

          rawData.push(
            Object.entries(record)
          ); /** need to try Object.defineProperty(oldObj, newObjKey, Object.getOwnPropertyDescriptor(oldObj, oldObjKey)); delete oldObj[oldObjKey] **/
        });
      data.splice(data.indexOf(record), 1, 0);
    }
  });
  newData = rawData.map((entries) => {
    return Object.fromEntries(entries);
  });
  data = data.concat(newData);
  data.forEach(async (record) => {
    if (record && record.number) {
      // log("record", record);
      try {
        await Container.findOneAndUpdate(
          {
            number: record.number,
          },
          {
            number: record.number,
            size: record.size,
            status: record.status,
            client: record.client,
            POL: record.POL,
            POD: record.POD,
            line: record.line,
            vessel: record.vessel,
            BL: record.BL,
            FD: record.FD,
            driver: record.driver || "",
            weight: record.weight,
            cargo: record.cargo,
            comments: record.comments,
          },
          {
            new: true,
            upsert: true,
          }
        );
      } catch (error) {
        log("ADD MANY CONTAINERS ERROR", error);
      }
      record = null;
    } else {
      log(record, "RECORD WITH NO NUMBER");
    }
  });
  res.redirect("/containers");
  try {
    await fs.unlink(file, (error) => {
      if (error) throw error;
      else {
        log(`BUFFER: ${file} deleted`);
      }
    });
  } catch (error) {
    log("DEL BUFFER ERROR", error);
  }
});

router.post("/set-period", auth, async (req, res) => {
  /******* get period containers here *******/
  log("get period containers here", req.body);

  try {
    const containers = await Container.find({ date: { $gte: date(req.body.dateFrom).UTCdate, $lte: date(req.body.dateTo).UTCdate } });

    containers.forEach((cont) => {
      if (cont.driver) {
        cont.driver = cont.driver.trim();
        if (!cont.driver.length) {
          cont.downtime = date(cont.vessel).downtime;
        }
      } else {
        cont.downtime = date(cont.vessel).downtime;
      }
    });

    res.render("containers",
    {
      activeUser: req.session.user.name,
      title: "Containers",
      place: "Containers DB",
      isContainers: true,
      containers
    });
  } catch (error) {
    log("GET ALL CONTAINERS ERROR", error);
  }
});


module.exports = router;
