import React from 'react';


class FileLoader {
    structure = {
        "Teens": ["Allgemein", "Allgemein2"],
        "Jugend": ["Allgemein", "Allgemein2"],
    };

    static async loadFile(path, type="md") {
        if(path === "/" || path === "") {
            path = "/Start"
        }
        try{
            const module = require("../files"+ path + "." + type);
            return await fetch(module).then(res => res.text());
        } catch (e) {
            return "";
        }

    }

    getStructure(dir = null) {
        if (dir && dir in this.structure) {
            return this.structure[dir]
        } else if (!dir) {
            let keys = [];
            for (let key in this.structure) {
                keys.push(key);
            }
            return keys;
        }
    }
}

export default FileLoader;
