const AlbumSchema = require("../models/album");

async function upload(req, res) {
  try {
    const { location, key } = req.files["thumb"][0];

    console.log(req.files["thumb"][0]);

    const { title, description, author, knowledge_area } = req.body;

    const album = await AlbumSchema.create({
      title,
      description,
      author,
      key,
      image_source: location,
      knowledge_area,
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

async function index(req, res) {
  try {
    const album = await AlbumSchema.findById(req.params.id);
    return res.send({ album });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Erro ao buscar album", message: err });
  }
}

async function update(req, res) {
  try {
    const { title, description, author, image_source, key, knowledge_area } =
      req.body;
    const album = await AlbumSchema.findByIdAndUpdate(
      req.params.id,
      { title, description, author, image_source, key, knowledge_area },
      {
        new: true,
      }
    );
    return res.send({ album });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar album" });
  }
}

async function publish(req, res) {
  try {
    const { publish } = req.body;
    await AlbumSchema.findByIdAndUpdate(req.params.id, { publish });
    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao publicar album" });
  }
}

module.exports = { upload, list, index, update, publish };
