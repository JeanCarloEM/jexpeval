const path = require('path');
const NpmDtsPlugin = require('npm-dts-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/jexpeval.ts",
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'jexpeval.js',
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