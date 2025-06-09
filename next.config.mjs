export default {
  // ...existing config...
  webpack(config) {
    config.module.rules.push({
      test: /\.js$/,
      type: 'javascript/auto',
    });
    return config;
  },
};