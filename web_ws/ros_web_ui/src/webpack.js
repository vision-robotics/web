module.exports = {
  // ...
  resolve: {
    fallback: {
      fs: require.resolve("fs-extra"),
      os: require.resolve("os-browserify/browser"),
      assert: require.resolve("assert/"),
      constants: require.resolve("constants-browserify"),
    },
  },
};
