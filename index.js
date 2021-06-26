require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const serveIndex = require("serve-index");

const {
  rootRouter,
  userRouter,
  uploadRouter,
  albumRouter,
  tagRouter,
  areaRouter,
  podcastRouter,
  searchRouter,
} = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routers
app.use("/api", rootRouter);
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/album", albumRouter);
app.use("/ap/podcast", podcastRouter);
app.use("/api/tag", tagRouter);
app.use("/api/area", areaRouter);
app.use("/api/search", searchRouter);

app.listen(process.env.PORT || 3333);
