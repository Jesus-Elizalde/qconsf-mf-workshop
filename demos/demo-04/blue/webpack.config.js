const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: {},
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: "auto",
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
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "blue",
      filename: "index.js",
      exposes: {
        "./basketInfo": "./src/basket-info.jsx",
        "./buyButton": "./src/buy-button.jsx",
      },
      remotes: {},
    }),
  ],
};
