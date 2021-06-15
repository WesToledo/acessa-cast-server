const KnowledgeAreaSchema = require("../models/knowledgeArea");

async function create(req, res) {
  try {
    const area = await KnowledgeAreaSchema.insertMany(req.body);

    return res.send({ area });
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Erro ao cadastrar area", message: err });
  }
}

async function list(req, res) {
  try {
    const area = await KnowledgeAreaSchema.find();
    res.send({ area });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao buscar areas" });
  }
}

module.exports = { create, list };
