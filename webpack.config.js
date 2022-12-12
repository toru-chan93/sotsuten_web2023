const path = require("path");

const script = {
  mode: "development",
  entry: "./sources/script/script.js",
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "./public/assets/script"),
  },
};

const scroll = {
  mode: "development",
  entry: "./sources/script/scroll.js",
  output: {
    filename: "scroll.js",
    path: path.resolve(__dirname, "./public/assets/script"),
  },
};

const three_script= {
  mode: "development",
  entry: "./sources/script/three_script.js",
  output: {
    filename: "three_script.js",
    path: path.resolve(__dirname, "./public/assets/script"),
  },
};

module.exports = [
  script, scroll, three_script
];
