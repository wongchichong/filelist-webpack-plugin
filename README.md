#filelist Plugin
Generate all files as json file in folder.

##Install
```bash
npm install --save-dev filelist-webpack-plugin
```

##Usage
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

##Output
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

##Usage
```js
const filelistWebpackPlugin = require('filelist-webpack-plugin');

module.exports = {

  plugins: [
    new filelistWebpackPlugin({
        format: 'array',
        //include others
        concat: [".", "./", "./scripts/app.js"],
        //files to exclude regex
        exclude: /filelist|robots/,        
        filePath: '../folderName',
        exportPath: '../exportPath/folderName/filelist.json'
    }),
  ]
}
```

##Output
filelist.json

```js
[
  "./2017-01-01/2017-01-01.md",
  "./2017-01-02/2017-01-02.md",
  "./2017-01-03/2017-01-03.md",
]
```

