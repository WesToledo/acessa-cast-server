const mongoose = require("../../database");

const KnowledgeAreaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const KnowledgeArea = mongoose.model("KnowledgeArea", KnowledgeAreaSchema);
module.exports = KnowledgeArea;
