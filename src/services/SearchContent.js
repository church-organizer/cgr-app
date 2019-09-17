const changeContentIfMatch = (content, searchContent) => {
    // return content;
    const regex = new RegExp(searchContent, "gi");
    let matches = content.match(regex);


    if (matches && searchContent) {
        for (let match of matches) {
            content = content.replace(match, `<span class="match">${match}</span>`);
        }
    }
    return content;
};

export default changeContentIfMatch;