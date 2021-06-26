const AlbumSchema = require("../models/album");
const PodcastSchema = require("../models/podcast");

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
    const albums = await AlbumSchema.find({ publish: true }).populate(
      "podcasts author tags"
    );
    return res.send({ albums });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Erro ao buscar albuns", message: err });
  }
}

async function index(req, res) {
  console.log(req.params.id);
  try {
    const album = await AlbumSchema.find({ _id: req.params.id }).populate({
      path: "podcasts",
      model: "Podcast",
      populate: {
        path: "tag",
        model: "Tag",
      },
    });
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

async function listMy(req, res) {
  console.log(req.params.id);
  try {
    const albums = await AlbumSchema.find({ author: req.params.id }).populate(
      "podcasts author"
    );
    return res.send({ albums });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Erro ao buscar albuns", message: err });
  }
}

async function remove(req, res) {
  try {
    const album = await AlbumSchema.findOne({ _id: req.params.id });

    const podcastsIds = album.podcasts.map(({ _id }) => _id);

    await album.remove({
      _id: {
        $in: podcastsIds,
      },
    });

    await PodcastSchema.deleteOne({ _id: req.params.idPodcast });

    res.send();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { upload, list, index, update, publish, listMy, remove };
