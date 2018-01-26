const path = require('path'); //nodeJs 原生的 path module
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ReloadPlugin = require('reload-html-webpack-plugin');

//css 拆成多支
const extractCSS = new ExtractTextPlugin('css/[name]_css.css');
const extractSESS = new ExtractTextPlugin('css/[name]_scss.css');
 
module.exports = {
	devtool: 'inline-source-map',
	entry: { //將 js 分成多支
		bundle: './src/js/main.js',
		print: './src/js/print.js'
	},
	output: { //使用 path.resolve() 來把相對路徑轉換成絕對路徑
		path: path.resolve(__dirname, 'dist'), // __dirname 當前的路徑
		// filename: 'js/index.js' 如果要把全部 js 打包用此方式
		filename: 'js/[name].js' // [name]會去讀取 entry object
	},
	module: { // module是由下往上讀取
		rules: [
			// {
			// 	test: /\.(css|scss)$/,
			// 	use: ExtractTextPlugin.extract({ //利用 extractPlugin 實例裡的 extract 來建立 Loader
			// 		fallback: 'style-loader',
			// 		use: [
			// 			'css-loader',
			// 			'sass-loader',
			// 			'postcss-loader'
			// 		]
			// 	})
			// },
			{
				test: /\.css$/,
				use: extractCSS.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'postcss-loader'
					]
				})
			},
			{
				test: /\.scss$/,
				use: extractSESS.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'postcss-loader',
						'sass-loader'
					]
				})
			},
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
						limit: 1024,
						name: 'img/[name].[ext]',
						publicPath:'../',//css路徑的前綴詞
						outputPath: ''
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
		contentBase: path.resolve(__dirname, 'dist/'),
		// publicPath: __dirname + "/dist",
		port: 3000,
		inline: true,
  	hot:true
	},
	plugins: [
		extractCSS,
		extractSESS,
		// new ExtractTextPlugin('css/style.css'), //將全部的 css 打包成一支，且不會內砍在 html 裡
		new ReloadPlugin(),
		new HtmlWebpackPlugin({ //生成 html 文件
			title: 'Webpack Test',
			template: path.join(__dirname, 'index.html'), //輸入路徑
			filename: path.resolve(__dirname, 'dist/index.html') //輸出路徑
		}),
		new CleanWebpackPlugin(['dist']),//打包前先清除 dist 資料夾
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({ // 利用 webpack.ProvidePlugin 讓 $ 和 jQuery 可以連結到 jquery library
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
    })
	]
}