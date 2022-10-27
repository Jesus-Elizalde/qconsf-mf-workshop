const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: {
    "red": "./src/index.jsx",
  },
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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "red",
      filename: "index.js",
      exposes: {
        "./page": "./src/index.jsx",
      },
      remotes: {
        green: "green@http://localhost:2003/index.js",
        blue: "blue@http://localhost:2002/index.js",
      },
    }),
  ],
};
