var path = require('path'); //nodeJs 原生的 path module
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
	entry: './src/js/main.js',
	output: { //使用 path.resolve() 來把相對路徑轉換成絕對路徑
			path: path.resolve(__dirname, 'dist'), // __dirname 當前的路徑
			filename: 'bundle.js'
	},
	watch: true,
	module: {// module是由下往上讀取
		rules: [{
			test: /\.css$/,//test 通常是使用一段 regex(正則表達式)
			use: [ //use會指定使用哪個 loader
					'style-loader',  // 這個後 (順序很重要)
					'css-loader' // 這個先
			]},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({ //利用 extractPlugin 實例裡的 extract 來建立 Loader
						use: [
								'css-loader', 
								'sass-loader'
						]
				})
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015'],
					plugins: ['transform-runtime']
				}
			}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(function(){
			//Do something!!
		}),
		new ExtractTextPlugin('style.css'), //將全部的css打包成一支
		new webpack.ProvidePlugin({ // 利用 webpack.ProvidePlugin 讓 $ 和 jQuery 可以連結到 jquery library
				$: 'jquery',
				jQuery: 'jquery'
		})
	]
}