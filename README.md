# Webpack 筆記
## webpack.config.js 設定檔記錄
- 變數定義
``` javascript
//nodeJs 原生的 path module
var path = require('path');
//將全部的css打包成一支
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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
		- `test`