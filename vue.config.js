module.exports = {
  productionSourceMap: false,  //don't need source maps for production
  // filenameHashing: false, 
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  }
}