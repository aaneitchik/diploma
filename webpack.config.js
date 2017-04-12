const path = require('path');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const entry = PRODUCTION
    ? './src/index.js'
    : [
          './src/index.jsx',
          'webpack/hot/dev-server',
          'webpack-dev-server/client?http://localhost:3000'
      ];

module.exports = {
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};
