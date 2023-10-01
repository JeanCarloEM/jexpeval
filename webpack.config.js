const path = require('path');
module.exports = {
  entry: "./src/jexpeval.ts",
  output: {
    filename: "jexpeval.umd.js",
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  }
}