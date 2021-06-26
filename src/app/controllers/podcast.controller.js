const PodcastSchema = require("../models/podcast");
const AlbumSchema = require("../models/album");
const aws = require("aws-sdk");

const s3 = new aws.S3({});

async function upload(req, res) {
  try {
    const { location: locationAudio, key: audioKey } = req.files["audio"][0];

    const { location: locationThumb, key: thumbKey } = req.files["thumb"][0];

    const { title, description, author, album: albumId, tags } = req.body;

    const podcast = await PodcastSchema.create({
      title,
      description,
      author,
      audio_key: audioKey,
      thumb_key: thumbKey,
      audio_source: locationAudio,
      image_source: locationThumb,
      tag: JSON.parse(tags),
    });

    const album = await AlbumSchema.findOne({ _id: albumId });
    album.podcasts.push(podcast._id);
    album.save();

    return res.send({ podcast: podcast });
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Erro ao cadastrar podcast", message: err });
  }
}

async function publish(req, res) {
  try {
    const { publish } = req.body;
    await PodcastSchema.findByIdAndUpdate(req.params.id, { publish });
    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao publicar podcast" });
  }
}

async function update(req, res) {
  console.log(req.body);

  try {
    const {
      _id,
      title,
      description,
      audio_key,
      image_key,
      tags,
      audioChange,
      imageChange,
      audio_source,
      image_source,
    } = req.body;

    if (audioChange) {
      await s3
        .deleteObject({
          Bucket: "acessa-cast-storage",
          Key: audio_key,
        })
        .promise();
    }

    if (imageChange) {
      await s3
        .deleteObject({
          Bucket: "acessa-cast-storage",
          Key: image_key,
        })
        .promise();
    }

    const locationAudio =
      audioChange === "true" ? req.files["audio"][0].location : audio_source;

    const locationImage =
      imageChange === "true" ? req.files["thumb"][0].location : image_source;

    const audioKey =
      audioChange === "true" ? req.files["audio"][0].key : audio_key;

    const thumbKey =
      imageChange === "true" ? req.files["thumb"][0].key : image_key;

    await PodcastSchema.findByIdAndUpdate(_id, {
      title,
      description,
      audio_key: audioKey,
      image_key: thumbKey,
      audio_source: locationAudio,
      image_source: locationImage,
      tag: JSON.parse(tags),
    });

    return res.send();
  } catch (err) {
    console.log(err);

    return res
      .status(400)
      .send({ error: "Erro ao editar podcast", message: err });
  }
}

module.exports = { upload, publish, update };
