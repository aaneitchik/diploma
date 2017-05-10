const path = require('path');
const webpack = require('webpack');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const ports = require('./config/ports');

const entry = PRODUCTION
	? './src/index.js'
	: [
			'./src/index.jsx',
			'webpack/hot/dev-server',
			`webpack-dev-server/client?http://localhost:${ports.ui}`
		];

const plugins = PRODUCTION
	? []
	: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.LoaderOptionsPlugin()
		];

module.exports = {
	entry,
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'bundle.js'
	},
	plugins,
	devtool: 'inline-eval-cheap-source-map',
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							importLoaders: 1
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				loader: 'file-loader'
			}
		]
	}
};
