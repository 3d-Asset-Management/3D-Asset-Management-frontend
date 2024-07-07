// config-overrides.js
module.exports = function override(config, env) {
    // Find the existing source-map-loader rule
    const sourceMapLoaderRule = config.module.rules.find(
      (rule) =>
        rule.enforce === 'pre' &&
        rule.use &&
        rule.use.some((loader) => loader.loader === 'source-map-loader')
    );
  
    // Exclude @mediapipe/tasks-vision from the source-map-loader
    if (sourceMapLoaderRule) {
      sourceMapLoaderRule.exclude = [
        ...(sourceMapLoaderRule.exclude || []),
        /node_modules\/@mediapipe\/tasks-vision/
      ];
    }
  
    return config;
  };
  
  // webpack.config.js
module.exports = {
  // ... other configurations
  resolve: {
    fallback: {
      "child_process": false,
      "fs": false,
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http")
    }
  }
};
