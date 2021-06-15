const mongoose = require("../../database");
const aws = require("aws-sdk");

const s3 = new aws.S3({});

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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  audio_key: {
    type: String,
    require: true,
  },
  image_key: {
    type: String,
    require: true,
  },
  audio_source: {
    type: String,
    require: true,
  },
  image_source: {
    type: String,
    require: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  publish: {
    type: Boolean,
    default: false,
  },
  tag: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
});

PodcastSchema.pre("remove", function () {
  return s3
    .deleteObjects({
      Bucket: "acessa-cast-storage",
      Delete: {
        Objects: [{ Key: this.audio_key }, { Key: this.image_key }],
      },
    })
    .promise();
});

const Podcast = mongoose.model("Podcast", PodcastSchema);

module.exports = Podcast;
