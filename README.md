# Webpack 筆記
## package.json `script` 使用說明
- `build`：打包，上線前使用
- `build:watch`：上線前可先做檢查
- `dev`：使用 webpack 自訂服務器，可在開發時使用
- `start`：使用 node 的服務器，可在開發時使用
## 設定檔基本說明
- 變數定義
	- path：nodeJs 原生的 path module
	- webpack：匯入 webpack 套件
	- extract-text-webpack-plugin：將全部的 css 打包到指定的資料夾裡
	- html-webpack-plugin：將 html 打包到指定的資料夾裡
	- clean-webpack-plugin：每次打包時會先清除指定的資料夾
	- reload-html-webpack-plugin：讓你的 html 能 hot reload
- `module.exports` 可讓設定檔可在外部使用
- `entry` 屬性：入口起點，代表著編譯前檔案的檔名，有分多種方式定義 `entry`，分別如下：
	- 單個入口：比較常使用在 single page 時，將全部打包成一份
	``` javacsript
	entry: './src/js/main.js'
	```
	- 物件：常使用在有第三方資源，ex: jQuery library...之類，需與自己寫的 js 做分離打包
	``` javascript
	entry: {
		bundle: './src/js/app.js',
		vendors: ['./src/js/jquery.min.js', './src/js/googleAnalytics.js']
	}
	```
	- 多個頁面各自載入：與物件使用方式一樣，只差在想將不同頁面的 js 做分離
	``` javascript
	entry: {
		pageOne: './src/pageOne/js/app.js',
		pageTwo: './src/pageTwo/js/app.js',
		pageThree: './src/pageThree/js/app.js'
	}
	```
- `output` 屬性：輸出到所指定的資料夾及自訂的檔名，設定介紹如下：
	- `path`：編譯結果的路徑
		- 使用 `path.resolve()` 來把相對路徑轉換成絕對路徑，(當前路徑, '指定的資料夾')
		- `__dirname`：當前的路徑
		``` javascript
		path: path.resolve(__dirname, 'dist'),
		```
	- `filename`：輸出 bundle 的名稱，當入口有多個，常使用的方式如下表：

	| 模板        | 描述    |
	| --------   | :-----  |
	| [name]        | 使用入口名稱      |
	| [id]        | 使用内部 chunk id      |
	| [hash]        | 使用每次建構過程中產生的 hash      |

	``` javascript
	//單個入口起點
	filename: "bundle.js"
	//入口名稱
	filename: "[name].bundle.js"
	//內部 chunk id
	filename: "[id].bundle.js"
	//每次建構過程中產生的 hash
	filename: "[hash].bundle.js"
	```
- `watch`：當是 `true` 時會自動編譯
- `module`：用來編譯不同類型的檔案，裡面會新增一個 `rules`
	- `rules`：代表會依序使用哪些 `loader` 來編譯這份檔案，`rules` 裡會新增每一條編譯的規則，而這裡每條規則都會有 `test` 和 `use` 兩個欄位
		- `test`：通常是使用一段 regex(正則表達式)
		- `use`：用來指定 `loader`
## 有使用的 plugin
- babel-loader
- css-loader
- style-loader
- sass-loader
- webpack
- extract-text-webpack-plugin
- jquery
- webpack-dev-server
- url-loader：此檔設定在 8192B 以下檔案會轉成 base64

