var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: "inline-source-map",
    entry:  path.join(__dirname, './app/main.js'),
    output: {
    path: path.join(__dirname, './dist/assets'),
    filename: '[name].bundle.js',
    publicPath: "/assets/",
    sourceMapFilename: '[name].map'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
	


};