const log = console.log;
const Handlebars = require("handlebars");
const expHBS = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const express = require("express");
const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const path = require("path");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const addRoutes = require("./routes/add");
const containersRoutes = require("./routes/containers");
const homeRoutes = require("./routes/home");
const containerRoutes = require("./routes/container");
const planningRoutes = require("./routes/planning");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const driversRoutes = require("./routes/drivers");
const driverRoutes = require("./routes/driver");
const vesselRoutes = require("./routes/vessel");
const vesselsRoutes = require("./routes/vessels");
const { DB, SECRET } = require("./data.js");
const varMid = require("./middleware/variables");
const csrf = require("csurf");

const hbs = expHBS.create({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: "main",
  extname: "hbs",
});

const PORT = process.env.PORT || 3000;
const store = new MongoStore({
  collection: "sessions",
  uri: DB,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);
app.use(csrf());
app.use(varMid);
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/add", addRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/containers", containersRoutes);
app.use("/container", containerRoutes);
app.use("/drivers", driversRoutes);
app.use("/driver", driverRoutes);
app.use("/vessels", vesselsRoutes);
app.use("/vessel", vesselRoutes);
app.use("/planning", planningRoutes);

const start = async () => {
  try {
    await mongoose.connect(`${DB}`, { useNewUrlParser: true });
    app.listen(PORT, () => {
      log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    log("START ERROR", err);
  }
};

start();
