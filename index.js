var fs = require('fs');
var path = require('path');
var url = require('url');
var rootPath = path.resolve(__dirname, '..');


class FlielistPlugin {
    constructor(options) {
        this.filePath = path.join(rootPath, options.filePath);
        this.exportPath = options.exportPath;
        this.format = options.format ? options.format : 'default'
    }

    apply(compiler) {

        compiler.plugin('emit', (compilation, callback) => {
            var fileList = this.getFileList(this.filePath, []);
            fileList = JSON.stringify(fileList, null, 4);

            compilation.assets[this.exportPath] = {
                source: function () {
                    return fileList;
                },
                size: function () {
                    return fileList.length;
                }
            };

            callback();
        });

    }

    join(p1, p2) {
        return p1 + "/" + p2;
    }

    getFileList(dir, filelist) {
        var files = fs.readdirSync(dir);

        filelist = filelist || [];

        if (this.format == 'default')
            files.forEach(file => {
                var filePath = this.join(dir, file);
                if (fs.statSync(filePath).isDirectory())
                    filelist.push({ [file]: this.getFileList(filePath, []) });
                else
                    filelist.push(file);

            });
        else if (this.format == 'array')
            files.forEach(file => {
                var filePath = this.join(dir, file);
                if (fs.statSync(filePath).isDirectory())
                    filelist.push(...this.getFileList(filePath, []));
                else
                    filelist.push(this.join(dir, file));
            });

        return filelist;
    };

}
module.exports = FlielistPlugin;

//let fp = new FlielistPlugin({ filePath: "./", exportPath: "./", format: "array" });
//console.log(fp.getFileList("."));
