const express = require("express");
const multer = require("multer");
const path = require("path");
const multerConfig = require("./src/app/config/multer");

const authMiddleware = require("./src/app/middleware/auth");

const user = require("./src/app/controllers/user.controller");
const auth = require("./src/app/controllers/authorization.controller");
const podcast = require("./src/app/controllers/podcast.controller");
const album = require("./src/app/controllers/album.controller");
const tag = require("./src/app/controllers/tag.controller");
const knowledgeArea = require("./src/app/controllers/knowledgeArea.controller");
const search = require("./src/app/controllers/search.controller");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname + Date.now() + path.extname(file.originalname));
//   },
// });

const uploadMiddleware = multer(multerConfig);

//Auth
const rootRouter = express.Router();
rootRouter.post("/login", auth.login);

// Users
const userRouter = express.Router();
// userRouter.use(authMiddleware);
userRouter.post("/create", user.create);
userRouter.get("/", user.list);
userRouter.get("/:id", user.index);
userRouter.put("/update/:id", user.update);
userRouter.delete("/remove/:id", user.remove);

// Upload
const uploadRouter = express.Router();

uploadRouter.post(
  "/podcast",
  uploadMiddleware.fields([
    { name: "thumb", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  podcast.upload
);

uploadRouter.post(
  "/album",
  uploadMiddleware.fields([{ name: "thumb", maxCount: 1 }]),
  album.upload
);

uploadRouter.put(
  "/podcast/update",
  uploadMiddleware.fields([
    { name: "thumb", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  podcast.update
);

// Albuns
const albumRouter = express.Router();
albumRouter.get("/", album.list);
albumRouter.get("/my/:id", album.listMy);
albumRouter.get("/:id", album.index);
albumRouter.put("/update/:id", album.update);
albumRouter.put("/publish/:id", album.publish);
albumRouter.delete("/remove/:id", album.remove);

//Podcasts
const podcastRouter = express.Router();
podcastRouter.put("/publish/:id", podcast.publish);
podcastRouter.delete("/remove/:idPodcast/:idAlbum", podcast.remove);

const searchRouter = express.Router();
searchRouter.post("/", search.searchPodcast);

// tag
const tagRouter = express.Router();
tagRouter.post("/create", tag.create);
tagRouter.get("/", tag.list);

// area
const areaRouter = express.Router();
areaRouter.post("/create", knowledgeArea.create);
areaRouter.get("/", knowledgeArea.list);

module.exports = {
  rootRouter,
  userRouter,
  uploadRouter,
  albumRouter,
  podcastRouter,
  tagRouter,
  areaRouter,
  searchRouter,
};
