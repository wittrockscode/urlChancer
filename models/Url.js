const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlCode: String,
  urls: [
    {
      url: {
        type: String
      },
      chance: {
        type: Number
      }
    }
  ],
  shortUrl: String,
  date: { type: String, default: Date.now() }
});

module.exports = mongoose.model("Url", urlSchema);
