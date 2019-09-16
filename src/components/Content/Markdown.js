import React from "react";
import ReactMarkdown from "react-markdown";
import "./Markdown.css"

const Markdown = (props) => {
    let content = props.source;
    const regex = /\B#[\w\-\.\_]+(?:\s|$)/g;

    if (content) {
        const matches = content.match(regex);
        if (matches) {
            for (let match of matches) {
                match = match.trim();
                let replaceText = `[${match}](/search?key=${match.replace("#", "")}&type=tags)`;
                content = content.replace(match, replaceText);
            }
        }
    }

    return <ReactMarkdown escapeHtml={false} transformImageUri={(test) => require("../../files/" + test)}
                          className="markdown-content"
                          source={content}/>
};

export default Markdown;
