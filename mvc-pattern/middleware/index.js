const { log } = require("console");
const fs = require("fs");
const path = require("path");

function logReqRes(fileName) {
  return async (req, res, next) => {
    try {
      await fs.appendFile(
        path.join(__dirname, fileName),
        "--Request--\n" + req.method + " " + req.path + "\n",
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
      // Logging response status code, but adjust as needed
      await fs.appendFile(
        path.join(__dirname, fileName),
        "--Response--\n" + res.statusCode + "\n",
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    } catch (err) {
      console.error("Error logging to file:", err);
    } finally {
      next();
    }
  };
}
module.exports = logReqRes;
