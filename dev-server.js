const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.config');
const ports = require('./config/ports');
const ip = require('./config/ip');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
	hot: true,
	filename: config.output.filename,
	publicPath: config.output.publicPath,
	stats: {
		color: true
	},
	proxy: [{
		path: '/api/**/*',
		target: `http://${ip}:${ports.server}`
	}],
	historyApiFallback: true
});

server.listen(ports.ui, 'localhost', () => {});
