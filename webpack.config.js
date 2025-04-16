// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Membersihkan direktori output sebelum build baru
  },
  devtool: "inline-source-map", // Berguna untuk debugging di development
  devServer: {
    static: "./dist",
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html", // Nama file HTML di direktori output
    }),
  ],
  mode: "development", // Atur ke 'production' untuk build produksi
};
