const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    "purple": ["systemjs-webpack-interop/auto-public-path", "./src/index.js"],
  },
  output: {
    libraryTarget: "system",
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: "",
  },
  mode: "development",
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
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
