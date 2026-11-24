// craco.config.js
// Webpack 4 uses md4 in output hashing, source maps (SourceMapDevToolPlugin), and
// ModuleFilenameHelpers. OpenSSL 3 (Node 17+) removed md4, so Netlify on Node 22 fails
// unless we substitute a supported algorithm here (output.hashFunction alone is not enough).
const crypto = require('crypto');
const path = require('path');
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
      
      // Add alias for @vercel/analytics to help Webpack 4 resolve package exports
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.resolve.alias = webpackConfig.resolve.alias || {};
      webpackConfig.resolve.alias['@vercel/analytics/react'] = path.join(__dirname, 'node_modules/@vercel/analytics/dist/react/index.js');
      
      return webpackConfig;
    },
  },
};
