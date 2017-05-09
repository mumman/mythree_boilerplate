var path = require('path');
var webpack = require('webpack');
module.exports = {
    devtool: "inline-source-map",
    entry: 
			'./app/main.js',
		 //vendor: ['jquery'],
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './build')
    },
	module: {
		loaders:[
		  { test: /\.css$/, loader: 'style-loader!css-loader' }
		]
	},

	// plugins: [
		// new webpack.optimize.UglifyJsPlugin({
			// compress: {
				// warnings: false
			// }
		// })
    // ]

};