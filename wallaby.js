// whenever wallaby loads the config file (and later uses babel),
// babel will know that we are in the `test` env

module.exports = wallaby => {
  require(path.join(wallaby.localProjectDir, "test", "test_helper"));

  const babel = require("babel");
  return {
    files: [
      "src/*.js",
      "test/test_helper.js" // <-- the file will now be processed by wallaby like the rest of files
    ],

    tests: ["test/*spec.js"],

    compilers: {
      "**/*.js": wallaby.compilers.babel({
        babel: babel,
        stage: 0
      })
    },

    workers: {
      initial: 6,
      regular: 2
    },

    env: {
      type: "node"
    },

    testFramework: "mocha",

    bootstrap: function bootstrap() {
      require("./test/test_helper"); // <-- it's in the `files` list, so you may just do that
    }
  };
};
