module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    port: 8080,
  },
};
