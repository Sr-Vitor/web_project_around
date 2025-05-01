const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./script/index.js", // ponto de entrada do JS
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true, // limpa dist a cada build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // para importar CSS no JS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // copia e insere <script> automaticamente
    }),
  ],
  devServer: {
    static: "./dist",
    open: true,
  },
  mode: "development",
};
