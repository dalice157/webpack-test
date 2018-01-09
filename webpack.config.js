const path = require('path'); //nodeJs 原生的 path module
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//css 拆成多支
// const extractCSS = new ExtractTextPlugin('css/[name]_css.css');
// const extractSESS = new ExtractTextPlugin('css/[name]_scss.css');
 
module.exports = {
	// entry: [ // 當 js 有更改時會自動 reload
	// 	'webpack-hot-middleware/client', 
	// 	'./src/js/main.js'
	// ],
	entry: {//js 拆成兩支
		bundle: './src/js/main.js',
		print: './src/js/print.js'
	},
	// devtool: 'inline-source-map',
	output: { //使用 path.resolve() 來把相對路徑轉換成絕對路徑
			path: path.resolve(__dirname, 'dist'), // __dirname 當前的路徑
			// filename: 'index.js'
			filename: './js/[name].js'
	},
	module: { // module是由下往上讀取
		rules: [
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({ //利用 extractPlugin 實例裡的 extract 來建立 Loader
					fallback: 'style-loader',
					use: [
						'css-loader',
						'sass-loader',
						'postcss-loader'
					]
				})
			},
			// {
			// 	test: /\.css$/,
			// 	use: extractCSS.extract({
			// 		fallback: 'style-loader',
			// 		use: [
			// 			'css-loader',
			// 			'postcss-loader'
			// 		]
			// 	})
			// },
			// {
			// 	test: /\.scss$/,
			// 	use: extractSESS.extract({
			// 		fallback: 'style-loader',
			// 		use: [
			// 			'css-loader',
			// 			'postcss-loader',
			// 			'sass-loader'
			// 		]
			// 	})
			// },
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use:{
					loader: 'babel-loader',
					options: {
						presets: [['env', {
                modules: false,
                targets: {
                  node: 4,
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 8',
                  ],
                },
              }]],
						plugins: ['transform-runtime']
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 1,
						outputPath: './img/'
					} 
				}]
			},
			{
				test: /\.html$/,
				use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href']
            }
          }
        ]
			}
		]
	},
	devServer: { // webpack-dev-server 使用
		hot: true,
		contentBase: path.join(__dirname, ''), // 因為 index.html 在根目錄
		publicPath: '/dist',
		stats: { colors: true }
	},
	plugins: [
		// extractCSS,
		// extractSESS,
		new ExtractTextPlugin('css/style.css'), //將全部的 css 打包成一支，且不會內砍在 html 裡
		new UglifyJSPlugin(),//壓縮檔案，不建議在開發時使用
		new HtmlWebpackPlugin({ //生成 html 文件
			title: 'Webpack Test',
			template: './index.html', //輸入路徑
			filename: 'index.html' //輸出路徑
		}),
		new CleanWebpackPlugin(['dist']),//打包前先清除 dist 資料夾
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({ // 利用 webpack.ProvidePlugin 讓 $ 和 jQuery 可以連結到 jquery library
			$: 'jquery',
			jQuery: 'jquery'
		})
	]
}