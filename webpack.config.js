const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const ports = require('./config/ports');

const entry = PRODUCTION
	? {
			app: './src/index.jsx',
			vendor: './src/vendor'
		}
	: {
			app: './src/index.jsx',
			vendor: './src/vendor',
			devServer: 'webpack/hot/dev-server',
			hot: `webpack-dev-server/client?http://localhost:${ports.ui}`
		};

const plugins = PRODUCTION
	? [
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: Infinity,
				filename: '[name].[hash].js'
			}),
			new ExtractTextPlugin('styles.css'),
			new HTMLWebpackPlugin({
				template: 'index-template.ejs',
				inject: false
			})
		]
	: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.LoaderOptionsPlugin(),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'vendor',
				minChunks: Infinity,
				filename: '[name].[hash].js'
			}),
			new HTMLWebpackPlugin({
				template: 'index-template.ejs',
				inject: false
			})
		];

const cssLoader = PRODUCTION
	? {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader'
			})
		}
	: {
			test: /\.css$/,
			use: [
				{
					loader: 'style-loader',
					options: {
						insertAt: 'top'
					}
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						importLoaders: 1
					}
				}
			]
		};

module.exports = {
	entry,
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[hash].js'
	},
	plugins,
	devtool: 'inline-eval-cheap-source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [path.resolve(__dirname, './src'), 'node_modules']
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			},
			cssLoader,
			{
				test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
				loader: 'file-loader'
			}
		]
	}
};
