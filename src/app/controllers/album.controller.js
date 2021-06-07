const AlbumSchema = require("../models/album");

async function upload(req, res) {
  try {
    const { path: pathThumb } = req.files["thumb"][0];
    const { title, description, author } = req.body;

    const album = await AlbumSchema.create({
      title,
      description,
      author,
      image_source: pathThumb,
    });

    return res.send({ album: album });
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Erro ao cadastrar album", message: err });
  }
}

async function list(req, res) {
  try {
    const albums = await AlbumSchema.find().populate("podcasts author");
    return res.send({ albums });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Erro ao buscar albuns", message: err });
  }
}

module.exports = { upload, list };
