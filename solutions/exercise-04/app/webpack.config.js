const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./src/index.js",
  },
  mode: "development",
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: "auto",
  },
  devtool: "source-map",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app",
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
      remotes: {
        consent: "consent@http://localhost:8080/index.js",
      },
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
