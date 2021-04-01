// vue.config.js
module.exports = {

  publicPath: process.env.NODE_ENV === 'production' ? "/" : "/",

    outputDir: "dist",
    //outputDir: "C:/AppServ/www/mto2",
    devServer: {
      disableHostCheck: true
    }

}