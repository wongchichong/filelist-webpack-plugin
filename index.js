var fs = require('fs');
var path = require('path');
var rootPath = path.resolve(__dirname, '..');

function getFileList(dir, filelist) {
    var files = fs.readdirSync(dir);
    
    filelist = filelist || [];

    files.forEach(function(file) {
        var filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            var childList = getFileList(filePath, []);
            filelist.push({
                [file]: childList
            });
        } else {
            filelist.push(file);
        }
    });
    return filelist;
};

function FlielistPlugin(options) {
    this.filePath = path.join(rootPath, options.filePath);
    this.exportPath = options.exportPath;
}

FlielistPlugin.prototype.apply = function(compiler) {

    compiler.plugin('emit', (compilation, callback) => {
        var fileList = getFileList(this.filePath, []);
        fileList = JSON.stringify(fileList, null, 4);

        compilation.assets[this.exportPath] = {
            source: function() {
                return fileList;
            },
            size: function() {
                return fileList.length;
            }
        };

        callback();
    });

};

module.exports = FlielistPlugin;