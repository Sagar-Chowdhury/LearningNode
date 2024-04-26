const express = require("express");
const {
  generateShortId,
  getUrlByShortId,
  getAnalyticsByShortId,
  renderHomepage,
} = require("../controller/url");


const router = express.Router();


router.post("/", generateShortId);

router.get("/:id", getUrlByShortId);

router.get("/analytics/:id", getAnalyticsByShortId);

router.get("/home/view", renderHomepage);

module.exports = router;
