const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const serveIndex = require("serve-index");

const {
  rootRouter,
  userRouter,
  uploadRouter,
  albumRouter,
} = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(
  "/ftp/public",
  express.static("public"),
  serveIndex("public", { icons: true })
);

// Routers
app.use("/api", rootRouter);
app.use("/api/user", userRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/album", albumRouter);

app.listen(process.env.PORT || 3333);
