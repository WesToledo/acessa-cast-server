const mongoose = require("../../database");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  knowledge_area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "KnowledgeArea",
  },
});

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
