const express = require("express");
var multer = require("multer");
const path = require("path");

const authMiddleware = require("./src/app/middleware/auth");

const user = require("./src/app/controllers/user.controller");
const auth = require("./src/app/controllers/authorization.controller");
const podcast = require("./src/app/controllers/podcast.controller");
const album = require("./src/app/controllers/album.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  },
});

const uploadMiddleware = multer({ storage });

//Auth
const rootRouter = express.Router();
rootRouter.post("/login", auth.login);

// Users
const userRouter = express.Router();
userRouter.use(authMiddleware);
userRouter.post("/create", user.create);
userRouter.get("/", user.list);
userRouter.get("/:id", user.index);
userRouter.put("/update/:id", user.update);
userRouter.delete("/remove/:id", user.remove);

// Upload
const uploadRouter = express.Router();

uploadRouter.post(
  "/podcast",
  uploadMiddleware.fields([{ name: "thumb", maxCount: 1 }, ,]),
  podcast.upload
);

uploadRouter.post(
  "/album",
  uploadMiddleware.fields([{ name: "thumb", maxCount: 1 }]),
  album.upload
);

// Albuns
const albumRouter = express.Router();
albumRouter.get("/", album.list);

module.exports = {
  rootRouter,
  userRouter,
  uploadRouter,
  albumRouter,
};
