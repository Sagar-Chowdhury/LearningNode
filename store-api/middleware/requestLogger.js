const fs = require("fs");
const path = require("path");

function logReqRes(fileName) {
  return async function (req, res, next) {
    try {
      await fs.appendFile(
        path.join(__dirname, fileName),
        "--Request--\n" + req.method + "  " + req.path + "\n",
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

      await fs.appendFile(
        path.join(__dirname, fileName),
        "--Resposne--\n" + res.statusCode + "  " + "\n",
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      next();
    }
  };
}

module.exports = logReqRes;
