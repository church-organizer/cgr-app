const changeContentIfMatch = (content, searchContent) => {
    // return content;
    const regex = new RegExp(searchContent, "g");
    let matches = content.match(regex);
    if (matches && searchContent) {
        return content.replace(regex, `<span class="match">${searchContent}</span>`);
    }
    return content;
};

export default changeContentIfMatch;