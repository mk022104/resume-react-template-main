module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
            type: 'javascript/auto',
            test: /\.mjs$/,
            use: []
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    }
  };