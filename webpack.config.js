const path = require('path');
const NpmDtsPlugin = require('npm-dts-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/jexpeval.ts",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'jexpeval.dev.js',
    libraryTarget: 'umd',
    library: 'jexpeval',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  plugins: [
    new NpmDtsPlugin({
      entry: "src/jexpeval.ts",
      output: "dist/jexpeval.d.ts",
      logLevel: "error"
    })
  ],
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" }
    ]
  }
}