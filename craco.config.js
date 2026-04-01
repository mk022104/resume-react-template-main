// craco.config.js
// Webpack 4 defaults to md4 for hashes; OpenSSL 3 (Node 17+) removed md4, which breaks builds.
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output = webpackConfig.output || {};
      webpackConfig.output.hashFunction = 'sha256';
      return webpackConfig;
    },
  },
};
