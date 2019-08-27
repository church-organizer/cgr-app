class FileLoader {
    static url = "http://localhost:3001/wiki/";
    structure = {
        "Teens": ["Allgemein", "Allgemein2"],
        "Jugend": ["Allgemein", "Allgemein2"],
    };


    static api(path = "") {
        if (path !== "") {
            path = "?page=" + path;
        }
        return fetch(this.url + "file/" + path).then(res => {
            return res.json().then(result => result.content);
        });
    }

    static structorFromApi() {
        return fetch(this.url + "structure/").then(res => {
            return res.json().then(result => result.structure);
        });
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

console.log(FileLoader.structorFromApi());

export default FileLoader;
