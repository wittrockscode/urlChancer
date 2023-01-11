const express = require("express");

const router = express.Router();

const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/Url");

router.post("/shorten", async (req, res) => {
  const { urls } = req.body;
  const baseUrl = config.get("baseUrl");

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  const urlCode = shortid.generate();

  let k = 0;
  for (let i = 0; i < urls.length; i++) {
    k += urls[i].chance;
  }

  if (k !== 100) {
    return res.status(400).json("Chances don't add up to 100");
  }

  const shortUrl = baseUrl + "/" + urlCode;

  const newUrl = new Url({
    urlCode,
    shortUrl,
    urls
  });

  await newUrl.save();

  res.json(newUrl);
});

module.exports = router;
