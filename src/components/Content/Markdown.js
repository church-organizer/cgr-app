import React from "react";
import ReactMarkdown from "react-markdown";
import "./Markdown.css"

const Markdown = (props) => {
    const content = props.source;

    return <ReactMarkdown className="markdown-content" source={content}/>
};

export default Markdown;
