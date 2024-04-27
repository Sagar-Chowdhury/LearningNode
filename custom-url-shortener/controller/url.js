const URL = require("../models/url");
const ShortUniqueId = require("short-unique-id");

async function generateShortId(req, res) {
  const body = req.body;
  if (!body || !body.url)
    return res.status(400).json({ response: "Invalid Request" });
  const redirectURL = body.url;
  const shortId = new ShortUniqueId({ length: 8 }).rnd();
  console.log(" Short id generated is " + shortId);
  const result = await URL.create({
    shortId: shortId,
    redirected_url: redirectURL,
  });
  return res.render("home",{
    id:shortId
  })
  // return res.status(201).json({
  //   response: `Short id created for URL ${redirectURL}`,
  //   shortIdGenerated: `${shortId}`,
  // });
}

async function getUrlByShortId(req, res) {
  const currShortId = req.params.id;
  if (!currShortId)
    return res.status(400).json({ response: "No Valid ShortId was found" });
  
  try {
    const result = await URL.findOneAndUpdate(
      { shortId: currShortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { upsert: true, new: true }
    );
    if (!result) {
      return res.status(400).json({ response: "Invalid Short-id specified." });
    } else {
      const redirectToURL = result.redirected_url;
      return res.status(200).redirect(redirectToURL);
    }
  } catch (err) {
    console.log("Error Updating Visited History ");
    return res.status(404).json({ response: "Error Updating Visited History" });
  }
}

async function getAnalyticsByShortId(req, res) {
  const currShortId = req.params.id;
  if (!currShortId)
    return res.status(400).json({ response: "No Valid ShortId was found" });
  const filter = { shortId: currShortId };
  const result = await URL.find(filter);
  console.log(result);
  if (!result || result.length==0 ) {
    res.status(400).json({ response: " No Such Short-Id found " });
  } else {
    const historyData = result[0].visitHistory;
    res.status(200).json({ clicks: `${historyData.length}` });
  }
}

async function renderAnalyticsPage(req, res) {
  const allData = await URL.find({});
  res.render("analytics", {
    data: allData,
  });
}

function renderHomePage(req,res){
  res.render("home")
}

module.exports = {
  generateShortId,
  getUrlByShortId,
  getAnalyticsByShortId,
  renderAnalyticsPage,
  renderHomePage
};
