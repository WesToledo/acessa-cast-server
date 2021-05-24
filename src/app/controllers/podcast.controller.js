const PodcastSchema = require("../models/podcast");
const AlbumSchema = require("../models/album");

async function upload(req, res) {
  try {
    const { path: pathAudio } = req.files["audio"][0];

    const { path: pathThumb } = req.files["thumb"][0];

    const { name, description, author, album: albumId } = req.body;

    const podcast = await PodcastSchema.create({
      name,
      description,
      author,
      audio_source: pathAudio,
      image_source: pathThumb,
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

module.exports = { upload };
