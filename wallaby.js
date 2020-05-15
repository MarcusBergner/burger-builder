var wallabyWebpack = require("wallaby-webpack");

const React = require("react");
module.exports = function (wallaby) {
  var webpackPostprocessor = wallabyWebpack({
    // webpack options

    externals: {
      // Use external version of React
      react: "React",
    },

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
