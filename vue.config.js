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
  },
  pwa: {
    name: 'Captain Crepe',
    themeColor: '#ff0000',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    }
  }
}
  