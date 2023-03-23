var express = require("express");
var app = express();
var path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
var passport = require("passport");
var session = require("express-session");
var env = require("dotenv").config();
var dbEnvCheck = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, "app/database/config.js"))[
  dbEnvCheck
];
var models = require("./app/database/models");
const SessionStore = require("express-session-sequelize")(session.Store);
const Sequelize = require("sequelize");

// ENABLE CORS FOR DEVELOPMENT  REQUESTS

app.use(cors());

// HELMET INTIALIZATION

app.use(helmet());

// MORGAN INTIALIZATION

app.use(morgan("tiny"));

// BODY PARSER INTIALIZATION

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// EXPRESS SESSION & PASSPORT

const passportDatabase = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const sequelizeSessionStore = new SessionStore({
  db: passportDatabase,
});

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // 1 month
    // },
    cookie: {
      maxAge: 30000, // 3 seconds
    },
    store: sequelizeSessionStore,
  })
); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

//INITIALIZE PASSPORT JS CONFIG

require("./app/authConfig/passport/passport.js")(passport, models.user);

//INITIALIZE AUTH ROUTES

var authRoute = require("./app/routes/auth.js")(app, passport);

// SYNC & TEST DATABASE CONNECTION

models.sequelize
  .sync()
  .then(function () {
    console.log(
      "\n",
      "*************************************************",
      "\n",
      `Nice! Database Connected Successfully`,
      "\n",
      "**************************************************"
    );
  })
  .catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

// PORT INTIALIZATION CONFIG

const port = process.env.PORT || 5000;

app.listen(port, (err, live) => {
  if (err) {
    console.error(err);
  }
  console.log(
    "\n",
    "*************************************************",
    "\n",
    `Server running on port ${port}`,
    "\n",
    "**************************************************"
  );
});
