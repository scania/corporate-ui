const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');


module.exports = {
  entry: './helpers.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'helpers.js',
    libraryTarget: 'umd',
    library: 'corporateUi',
    umdNamedDefine: true
  },
  plugins: [
      new CleanWebpackPlugin(['build']),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
  ]
};
