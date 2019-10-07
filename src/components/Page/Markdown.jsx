import React from "react";
import ReactHtmlParser from 'react-html-parser';
import marked from "marked";
import "./Markdown.css"
import FileLoader from "../../services/FileLoader";

const Markdown = (props) => {
    let content = props.source;
    const hashtagRegex = /\B#[\w\-\.\_]+(?:\s|$)/g;
    const imageRegex = /\!\[.*\]\(.*.png\)/g;


    const changeHashtagIntoLink = () => {
        const matches = content.match(hashtagRegex);
        if (matches) {
            for (let match of matches) {
                match = match.trim();
                let replaceText = `[${match}](/search?key=${match.replace("#", "")}&type=tags)`;
                content = content.replace(match, replaceText);
            }
        }

    };

    const changeImageUrlInMD = () => {
        const logoRegex = /\(.*\)/;
        const matches = content.match(imageRegex);
        if(matches) {
            for (let match of matches) {
                let newUrl = match;
                let imageName = newUrl.match(logoRegex)[0];
                imageName = imageName.replace(/(\(|\))/g, "");
                newUrl = newUrl.replace(logoRegex, "("+FileLoader.url + "images/" + imageName + ")");
                content = content.replace(match, newUrl);
            }
        }
    };

    if(content){
        changeHashtagIntoLink();
        changeImageUrlInMD();
    }


    const set = marked(content);
    return <div>{ReactHtmlParser(set)}</div>
};

export default Markdown;
