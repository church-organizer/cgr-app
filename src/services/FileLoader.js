class FileLoader {
    structure = {
        "Teens": ["Allgemein", "Allgemein2"],
        "Jugend": ["Allgemein", "Allgemein2"],
    };


    static api(path = "") {
        if (path !== "") {
            path = "?page=" + path;
        }
        return fetch("http://localhost:3001/wiki/file/" + path).then(res => {
            return res.json().then(res => res.content);
        }).catch(err => {
            console.log("Error");
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

export default FileLoader;
