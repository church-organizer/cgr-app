class FileLoader {
    static url = 'https://wiki.loetkemann.com/';


    static getPage(path = "") {
        if (path !== "") {
            path = "?page=" + path;
        }
        return fetch(this.url + "wiki/file/" + path).then(res => {
            return res.json().then(result => result.content);
        });
    }

    static getStructure() {
        return fetch(this.url + "wiki/structure/").then(res => {
            return res.json().then(result => result.structure);
        });
    }

    static search(searchWord, type="") {
        return fetch(this.url + "wiki/search", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({searchWord: searchWord, type: type})
        }).then(res => {
            return res.json().then(result => result);
        });
    }

    static saveFile(filename, content) {
        return fetch(this.url + "wiki/save", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({filename: filename, content: content})
        }).then(res => res.json().then(res => res));
    }
}


export default FileLoader;
