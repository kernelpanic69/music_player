const fs = require("fs");
const path = require("path");
const mm = require("music-metadata");
const uniqid = require('uniqid');

const supportedExtensions = [".mp3", ".m4a"];

let rootDir;
let lib = {};

function setRootDir(_rootDir) {
    rootDir = path.normalize(_rootDir);

    if (!fs.lstatSync(rootDir).isDirectory()) {
        throw new Error("Library root must be a directory.");
    }

    scan();
}

function traverseDir(dir, action) {
    let files = fs.readdirSync(dir);

    for (let file of files) {
        file = path.join(dir, file);

        if (fs.lstatSync(file).isDirectory()) {
            traverseDir(file);
        } else {
            action(file);
        }
    }
}

function scan() {
    traverseDir(rootDir, (file) => {
        if (supportedExtensions.includes(path.extname(file))) {
            mm.parseFile(file).then((meta) => {
                let id = uniqid("track_");
                let item = {};
                if (meta.common) {
                    item = {
                        id,
                        title: meta.common.title,
                        artist: meta.common.artist,
                        album: meta.common.album,
                        length: meta.format.duration
                    }
                }

                item.file = path.basename(file);
                item.path = file;

                lib[id] = item;
            });
        }
    });
}

function getLibrary() {
    return lib;
}

function getRootDir(){
    return rootDir;
}

module.exports = Object.freeze({
    scan,
    setRootDir,
    getLibrary,
    getRootDir
});