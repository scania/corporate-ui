const path = require('path');
// const includePath = path.resolve(__dirname, '..');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        // include: includePath,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'/*,
            options: {
              sourceMap: true
            }*/
          },
          {
            loader: 'sass-loader'
          },
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            collapseWhitespace: false,
            minimize: true,
            removeComments: false
          }
        }
      }/*,
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        include: includePath,
        use: 'url-loader'
      }*/
    ]
  }
};
