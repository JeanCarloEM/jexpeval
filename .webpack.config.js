const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/jexpeval.ts",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'jexpeval.js',
    libraryTarget: 'umd',
    library: 'jexpeval',
    umdNamedDefine: true,
    scriptType: 'module'
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