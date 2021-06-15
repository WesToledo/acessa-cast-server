const TagSchema = require("../models/tag");

async function create(req, res) {
  try {
    const tag = await TagSchema.insertMany(req.body);

    return res.send({ tag });
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Erro ao cadastrar tag", message: err });
  }
}

async function list(req, res) {
  try {
    const tag = await TagSchema.find();
    res.send({ tag });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar tags" });
  }
}

module.exports = { create, list };
