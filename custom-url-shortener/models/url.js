const { mongoose, SchemaTypes } = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    redirected_url: {
      type: SchemaTypes.String,
      required: true,
    },
    visitHistory: [{ timestap: { type: Number } }],
  },
  { timestaps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
