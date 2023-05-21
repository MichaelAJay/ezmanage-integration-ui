const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/": {
        target: "https://hbh-integration-wop5xl5p7a-uc.a.run.app",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/": "" },
        ws: false,
      },
    },
  },
});
