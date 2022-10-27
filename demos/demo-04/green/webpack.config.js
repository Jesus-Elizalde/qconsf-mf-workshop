const { ModuleFederationPlugin } = require("webpack").container;
const { resolve } = require('path');

module.exports = {
  entry: {
    "green": "./src/index.js",
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
    // see below for an explanation
    alias: {
      svelte: resolve('node_modules', 'svelte')
    },
    extensions: ['.js', '.mjs', '.svelte', '.json'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(html|svelte)$/,
        use: 'svelte-loader'
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
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
      name: "green",
      filename: "index.js",
      exposes: {
        "./recommendations": "./src/index.js",
      },
      remotes: {},
    }),
  ],
};
