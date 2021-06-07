const mongoose = require("../../database");

const PodcastSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    require: true,
    default: "Episode",
  },
  date: {
    type: Date,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  uri: {
    type: String,
    require: true,
  },
  image_source: {
    type: String,
    require: true,
  },
});

const Podcast = mongoose.model("Podcast", PodcastSchema);

module.exports = Podcast;
