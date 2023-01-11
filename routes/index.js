const express = require("express");

const router = express.Router();

const Url = require("../models/Url");

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      const r = Math.floor(Math.random() * 100);

      let x = [];
      for (let i = 0; i < url.urls.length; i++) {
        let w = 0;
        for (let j = 0; j <= i; j++) {
          w += url.urls[j].chance;
        }
        x[i] = w;
      }

      let k = -1;

      for (let i = 0; i < url.urls.length; i++) {
        if (i === 0) {
          if (r < url.urls[i].chance) {
            k = i;
            break;
          }
        } else if (i === url.urls.length - 1) {
          if (r > url.urls[i].chance) {
            k = i;
            break;
          }
        } else {
          if (r > x[i - 1] && r < x[i]) {
            k = i;
            break;
          }
        }
      }

      console.log(r + " " + url.urls[k].url);
      res.redirect(url.urls[k].url);
    } else {
      return res.status(400).json("error");
    }
  } catch (err) {
    return res.status(404).json("Not found");
  }
});

module.exports = router;
