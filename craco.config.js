// craco.config.js
// Webpack 4 uses md4 in output hashing, source maps (SourceMapDevToolPlugin), and
// ModuleFilenameHelpers. OpenSSL 3 (Node 17+) removed md4, so Netlify on Node 22 fails
// unless we substitute a supported algorithm here (output.hashFunction alone is not enough).
const crypto = require('crypto');
const originalCreateHash = crypto.createHash;
crypto.createHash = function patchedCreateHash(algorithm) {
  return originalCreateHash.call(
    crypto,
    algorithm === 'md4' ? 'sha256' : algorithm
  );
};

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
