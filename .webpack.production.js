const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/jexpeval.ts",
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'jexpeval.min.js',
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