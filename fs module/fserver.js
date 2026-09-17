let fp = require('fs');
let path = require('path');
let arr = [];


const source = process.argv[2];
const extension = process.argv[3];
const destination = process.argv[4];
let res = fp.existsSync(source);
if (!res) {
    console.log("source directory dont exist");
    process.exit();
}
if (!fp.existsSync(destination)) {
    fp.mkdirSync(destination);
}

function findfolder(folder,destFolder) {
    let data = fp.readdirSync(folder);
    for (let file of data) {
        let fullpath = path.join(folder, file);
        let fileinfo = fp.statSync(fullpath);
        if (fileinfo.isDirectory()) {
            let newDest = path.join(destFolder, file);
            if (!fp.existsSync(newDest)) {
                fp.mkdirSync(newDest);
            }
            findfolder(fullpath,newDest);
        }
        else {
            if (path.extname(file) === extension) {
                fp.copyFileSync(fullpath, destination + '/' + file)

            } console.log("copied");
        }
    }
}
findfolder(source,destination);