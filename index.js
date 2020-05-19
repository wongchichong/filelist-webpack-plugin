var fs = require('fs');
var path = require('path');
var url = require('url');
var rootPath = path.resolve(__dirname, '..');


class FlielistPlugin {
    constructor(options) {
        this.filePath = path.join(rootPath, options.filePath);
        this.exportPath = options.exportPath;
        this.format = options.format ? options.format : 'default';
        this.exclude = options.exclude;
        this.concat = options.concat;
    }

    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            var fileList = Array.from(new Set(this.getFileList(this.filePath, this.concat ? this.concat : [])));
            fileList = JSON.stringify(fileList, null, 4);

            if (fs.existsSync(this.exportPath)) {
                console.log("Deleting " + this.exportPath);
                fs.unlink(this.exportPath);
            }
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

    replace(p1) {
        return p1.replace(this.filePath, ".").replace(/\\/g, "/"); //.replace("\\\\", "/");
    }

    getFileList(dir, filelist) {
        var files = fs.readdirSync(dir);
        const { exclude, format } = this;
        filelist = filelist || [];

        if (format == 'default')
            files.forEach(file => {
                var filePath = path.join(dir, file);
                if (fs.statSync(filePath).isDirectory())
                    filelist.push({ [file]: this.getFileList(filePath, []) });
                else if (!exclude || !file.match(exclude))
                    filelist.push(file);
            });
        else if (format == 'array')
            files.forEach(file => {
                let rf = this.replace(path.join(dir, file));
                var filePath = path.join(dir, file);

                if (fs.statSync(filePath).isDirectory())
                    filelist.push(...this.getFileList(filePath, []));
                else if (!exclude || !rf.match(exclude))
                    filelist.push(rf);
            });

        return filelist;
    };

}
module.exports = FlielistPlugin;

//let fp = new FlielistPlugin({ filePath: "./", exportPath: "./", format: "array" });
//console.log(fp.getFileList("."));
