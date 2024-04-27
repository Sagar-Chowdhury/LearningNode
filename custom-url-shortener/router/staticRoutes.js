const express = require("express");
const {renderAnalyticsPage,renderHomePage} = require("../controller/url")

const staticRouter = express.Router();

staticRouter.get("/",renderHomePage)
staticRouter.get("/analytics",renderAnalyticsPage)

module.exports = staticRouter;