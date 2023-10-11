const swaggerFile = require("./utils/api-doc/swagger-output.json");
const RedisStore = require("connect-redis").default;
const session = require("express-session");
const mongoose = require("mongoose");
const express = require("express");

const path = require("path");
var morgan = require("morgan");
const redis = require("redis");
const cors = require("cors");
const fs = require("fs");
(swaggerJsdoc = require("swagger-jsdoc")),
  (swaggerUi = require("swagger-ui-express"));

const passport = require("passport");
require("dotenv").config();

const app = express();
app.use(morgan("tiny"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // preflightContinue: true,
    // optionsSuccessStatus: 204,
  })
);

// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// };
// app.use(allowCrossDomain);

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@my-cluster.wlkgtiv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`app connected with ${process.env.DB_NAME} database 🚀`);
  })
  .catch((err) => {
    console.error("MongoDB connection error: ", err);
  });

let redisClient = redis.createClient({
  password: "8xUqC1qcsOk7vAK1f8snb6OiJJPurPa1",
  socket: {
    host: "redis-12330.c93.us-east-1-3.ec2.cloud.redislabs.com",
    port: 12330,
  },
});

redisClient
  .connect()
  .then((res) => console.log("redis is connected 💾"))
  .catch(console.error);

// Initialize store.

let redisStore = new RedisStore({
  client: redisClient,
  prefix: "bazar:",
});

app.use(
  session({
    store: redisStore,
    // cookie: { maxAge: 5000 },
    maxAge: 365 * 24 * 60 * 60 * 1000,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: true, // recommended: only save session when data exists

    secret: "keyboard_cat",
  })
);

// This is the basic express session({..}) initialization.
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session".

// API routes
function loadRoutes(app) {
  const routesDir = path.join(__dirname, "routes");

  fs.readdirSync(routesDir).forEach((file) => {
    const routePath = path.join(routesDir, file);
    const routeModule = require(routePath);
    // console.log(routeModule);

    app.use(routeModule);
  });
}

loadRoutes(app);

app.get("/", (req, res) => {
  res.send("haha its running");
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
