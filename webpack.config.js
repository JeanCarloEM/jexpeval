const path = require('path');

module.exports = {
  entry: "./build/src/jexpeval.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'jexpeval.bundle.js',
    libraryTarget: 'umd',
    library: 'jexpeval',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
    ]
  }
}