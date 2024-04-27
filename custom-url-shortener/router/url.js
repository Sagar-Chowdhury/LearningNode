const express = require("express");
const {
  generateShortId,
  getUrlByShortId,
  getAnalyticsByShortId,
} = require("../controller/url");

const router = express.Router();

router.post("/", generateShortId);

router.get("/:id", getUrlByShortId);

router.get("/analytics/:id", getAnalyticsByShortId);

module.exports = router;
