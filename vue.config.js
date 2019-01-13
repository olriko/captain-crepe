module.exports = {
  devServer: {
    disableHostCheck: true
  },
    css: {
      loaderOptions: {
        sass: {
          data: `@import "@/styles/app.scss";`
        }
      }
    }
  }
  