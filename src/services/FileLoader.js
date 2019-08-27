class FileLoader {
    structure = {
        "Teens": ["Allgemein", "Allgemein2"],
        "Jugend": ["Allgemein", "Allgemein2"],
    };

    static async loadFile(path, type = "md") {
        if (path === "/" || path === "") {
            path = "/Start"
        } else if (path.replace("/", "") in new FileLoader().structure) {
            const name = path.replace("/", "");
            const structure = new FileLoader().structure;
            let links = "";
            for (let item of structure[name]) {
                links += `- [${item}](${path + "/" + item})\n\n`
            }
            const content = `# ${name}\nHier sind die Unterverzeichnisse\n\n\n${links}`;
            console.log(content);
            return new Promise(function (resolve, reject) {
                resolve(content);
            })
        }
        try {
            const module = require("../files" + path + "." + type);
            return await fetch(module).then(res => res.text());
        } catch (e) {
            return "";
        }

    }

    static api(path = "") {
        if (path !== "") {
            path = "?page=" +path;
        }
        fetch("http://localhost:3001/wiki/file/" + path).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
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
