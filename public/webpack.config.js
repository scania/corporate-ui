module.exports = (baseConfig) => {
  baseConfig.module.rules.push({
    test: /\.(css|scss)$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
  },
  {
    test: /\.(mjs|jsx|js?)$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/react'],
        },
      },
    ],
  });

  baseConfig.entry = baseConfig.entry.filter(item => {
    if (item.indexOf('webpack-hot-middleware') === -1) {
      return item;
    }
  });
  baseConfig.plugins = baseConfig.plugins.filter(item => item.constructor.name !== 'HotModuleReplacementPlugin');

  return baseConfig;
};
