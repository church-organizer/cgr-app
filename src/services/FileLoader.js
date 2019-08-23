import React from 'react';
import Teens1 from '../files/teens/Allgemein.md';
import Teens2 from '../files/teens/Allgemein2.md';
import Youth1 from '../files/youth/Allgemein.md';
import Youth2 from '../files/youth/Allgemein2.md';
import Teens from '../files/teens.md';
import Start from '../files/Start.md';

class FileLoader {

    static getFilesFromDir(path) {
        switch (path) {
            case "/":
                return fetch(Start).then(res => res.text());
            case "/teens/Allgemein":
                return fetch(Teens1).then(res => res.text());
            case "/teens/Allgemein2":
                return fetch(Teens2).then(res => res.text());
            case "/youth/Allgemein":
                return fetch(Youth1).then(res => res.text());
            case "/youth/Allgemein2":
                return fetch(Youth2).then(res => res.text());
            case "/teens":
                return fetch(Teens).then(res => res.text());
        }

    }
}

export default FileLoader;
