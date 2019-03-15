module.exports = (baseConfig) => {
  baseConfig.module.rules.push({
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
      /*,
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        include: includePath,
        use: 'url-loader'
      }*/
  })

  // remove HMR to disable hot reload
  baseConfig.entry = baseConfig.entry.filter(item => {
    if(item.indexOf('webpack-hot-middleware') == -1){
     return item
    }
  });
  baseConfig.plugins = baseConfig.plugins.filter(item => item.constructor.name !== 'HotModuleReplacementPlugin')

  return baseConfig
};



