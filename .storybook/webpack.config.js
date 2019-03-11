// const path = require('path');
// const includePath = path.resolve(__dirname, '..');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      } /*,
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        include: includePath,
        use: 'url-loader'
      }*/
    ]
  }
}
