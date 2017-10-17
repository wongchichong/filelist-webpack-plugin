
<div align="center">
  <h1>filelist Plugin</h1>
  <p>Generate all files as json file in folder.</p>
</div>
<h2 align="center">Install</h2>

```bash
npm install --save-dev filelist-webpack-plugin
```

<h2 align="center">Usage</h2>
```js
const filelistWebpackPlugin = require('filelist-webpack-plugin');

module.exports = {
  
  plugins: [
    new filelistWebpackPlugin({
        filePath: '../folderName',
        exportPath: '../exportPath/folderName/filelist.json'
    }),
  ]
}
```

<h2 align="center">Output</h2>
filelist.json
```js
[
    {
        "2017-01-01": [
            "2017-01-01.md"
        ]
    },
    {
        "2017-01-02": [
            "2017-01-02.md"
        ]
    },
    {
        "2017-01-03": [
            "2017-01-03.md"
        ]
    }
]
```