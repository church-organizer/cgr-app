/**
 * gets a content and searchContent and replaces every match with a html string
 * appends the difference from start to the index and the replaced text
 * in the end it adds the rest of the content
 * @param content
 * @param searchContent
 * @returns {string|*}
 */
const changeContentIfMatch = (content, searchContent) => {
    const regex = new RegExp(searchContent, "gi");
    let matches = content.match(regex).filter(match => match !== "" && match !== null);
    if(matches === null){
        return content;
    }

    let start = 0;
    let readyContent ="";
    for(let match of matches) {
        let index = content.indexOf(match, start);
        let replaceContent = `<span class="match">${match}</span>`;
        readyContent += content.slice(start, index) + replaceContent;
        start = index + match.length;
    }
    return readyContent + content.slice(start, content.length);
};

export default changeContentIfMatch;
