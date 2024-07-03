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
  