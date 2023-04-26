module.exports = {
  assetsDir: "static-vue",
  devServer: {
    proxy: {
      "/api.php": {
        target: "http://lieaonida.com/",
      },
      "static/": {
        target: "http://lieaonida.com/",
      },
    },
  },
};
