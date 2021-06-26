const AlbumSchema = require("../models/album");
const PodcastSchema = require("../models/podcast");

async function searchPodcast(req, res) {
  console.warn(req.body);

  if (!req.body.text) return res.send().status(600);

  const compare = (a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  };

  try {
    const { text } = req.body;
    var list = [];

    var albums = await AlbumSchema.find({
      title: { $regex: text, $options: "i" },
    }).populate("podcasts author");

    var podcasts = await PodcastSchema.find({
      title: { $regex: text, $options: "i" },
    }).populate("author tags");

    if (albums.length > 0)
      albums.forEach((album) => {
        list.push({
          _id: album._id,
          type: "album",
          title: album.title,
          description: album.description,
          author: album.author,
          key: album.key,
          image_source: album.image_source,
          podcasts: album.podcasts,
        });
      });

    if (podcasts.length > 0)
      podcasts.forEach((podcast) => {
        list.push({
          type: "podcast",
          title: podcast.title,
          description: podcast.description,
          audio_source: podcast.audio_source,
          image_source: podcast.image_source,
          audio_key: podcast.audio_key,
          author: podcast.author,
        });
      });

    console.log("list", list);

    if (list.length > 1) list.sort(compare);

    return res.send({ list });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ error: "Erro ao buscar albuns", message: err });
  }
}

module.exports = { searchPodcast };
