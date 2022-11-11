const path = require("path");

module.exports = {
  mode: "development",
  entry: "./sources/script/script.js",
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "./public/assets/script"),
  },
};
