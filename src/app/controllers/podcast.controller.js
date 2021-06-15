const PodcastSchema = require("../models/podcast");
const AlbumSchema = require("../models/album");

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

  console.warn(req.body);
  console.warn(req.files);
}

module.exports = { upload };
