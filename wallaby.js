var wallabyWebpack = require("wallaby-webpack");
const webpack = require("webpack");
module.exports = function (wallaby) {
  var webpackPostprocessor = wallabyWebpack({
    // webpack options
    plugins: [
      new webpack.NormalModuleReplacementPlugin(
        /\.(gif|png|scss|css)$/,
        "node-noop"
      ),
    ],

    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: "null",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  });

  return {
    files: [
      { pattern: "src/**/*.js*", load: false },
      { pattern: "src/**/*test.js*", ignore: true },
    ],

    tests: [{ pattern: "src/**/*test.js*", load: false }],

    env: { kind: "chrome" },
    compilers: {
      "**/*.js": wallaby.compilers.babel({
        presets: ["react-app"],
      }),
    },
    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },
  };
};
