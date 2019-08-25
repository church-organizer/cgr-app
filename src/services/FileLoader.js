import React from 'react';
import Teens1 from '../files/Teens/Allgemein.md';
import Teens2 from '../files/Teens/Allgemein2.md';
import Youth1 from '../files/Jugend/Allgemein.md';
import Youth2 from '../files/Jugend/Allgemein2.md';
import Teens from '../files/Teens.md';
import Start from '../files/Start.md';

class FileLoader {
    structure = {
        "Teens": ["Allgemein", "Allgemein2"],
        "Jugend": ["Allgemein", "Allgemein2"],
    };

    /**
     * Loads the correct Module depending on the path
     * @param path current path in the browser
     * @returns {Promise<string>} the string is the content of the file
     */
    static getContentFromFile(path) {
        path = path.toLowerCase();
        switch (path) {
            case "/":
                return fetch(Start).then(res => res.text());
            case "/Teens/Allgemein".toLowerCase():
                return fetch(Teens1).then(res => res.text());
            case "/Teens/Allgemein2".toLowerCase():
                return fetch(Teens2).then(res => res.text());
            case "/Jugend/Allgemein".toLowerCase():
                return fetch(Youth1).then(res => res.text());
            case "/Jugend/Allgemein2".toLowerCase():
                return fetch(Youth2).then(res => res.text());
            case "/Teens".toLowerCase():
                return fetch(Teens).then(res => res.text());
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
