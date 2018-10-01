const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  id: { type: String, required: true, unique: true},
  title: { type: String, required: true },
  date: { type: String, required: true },
  url: { type: String, required: true },
  snippet: { type: String }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
