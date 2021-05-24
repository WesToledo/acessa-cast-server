const mongoose = require("../../database");

const AlbumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  image_source: {
    type: String,
    require: true,
  },
  podcasts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast",
    },
  ],
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
