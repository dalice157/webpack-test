# Webpack 筆記
## package.json `script` 使用說明
- `build`：打包，上線前使用
- `build:watch`：上線前可先做檢查
- `dev`：使用 webpack 自訂服務器，可在開發時使用
- `start`：使用 node 的服務器，可在開發時使用
## 設定檔基本款說明
- 變數定義
	- path：nodeJs 原生的 path module
	- webpack：匯入 webpack 套件
	- ExtractTextPlugin：將全部的 css 打包成一支
``` javascript
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
```
- `module.exports` 可讓設定檔可在外部使用
- `entry` 屬性：代表著編譯前檔案的檔名
- `output` 屬性：代表編譯後輸出的檔名，webpack 分成 `path` 和 `filename` 兩個欄位做設定
	- `path`：編譯結果的路徑
		- 使用 `path.resolve()` 來把相對路徑轉換成絕對路徑
		- `__dirname`：當前的路徑
	- `filename`：編譯結果的檔名
- `	watch`：當是 `true` 時會自動編譯
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

