const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./script/index.js", // caminho ajustado para seu index.js
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true, // limpa dist a cada build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // permite importar CSS no JS
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // usa src/index.html como base
    }),
  ],
  devServer: {
    static: "./dist",
    open: true,
  },
  mode: "development", // pode trocar por 'production' em builds finais
};
