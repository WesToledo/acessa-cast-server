const mongoose = require("../../database");
const aws = require("aws-sdk");

const s3 = new aws.S3({});

const AlbumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  key: {
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
  createAt: {
    type: Date,
    default: Date.now(),
  },
  publish: {
    type: Boolean,
    default: false,
  },
  knowledge_area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KnowledgeArea",
    require: true,
  },
});

AlbumSchema.pre("remove", function () {
  return s3
    .deleteObject({
      Bucket: "acessa-cast-storage",
      Key: this.key,
    })
    .promise();
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
