class FileLoader {
    static url = 'https://wiki.loetkemann.com/wiki/';


    static getPage(path = "") {
        if (path !== "") {
            path = "?page=" + path;
        }
        return fetch(this.url + "file/" + path).then(res => {
            return res.json().then(result => result.content);
        });
    }

    static getStructure() {
        return fetch(this.url + "structure/").then(res => {
            return res.json().then(result => result.structure);
        });
    }

    static search(searchWord, type="") {
        return fetch(this.url + "search", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({searchWord: searchWord, type: type})
        }).then(res => {
            return res.json().then(result => result);
        });
    }

    static saveFile(filename, content) {
        console.log(filename, content);
        return fetch(this.url + "save", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({filename: filename, content: content})
        }).then(res => res.json().then(res => res));
    }
}


export default FileLoader;
