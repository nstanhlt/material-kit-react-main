const html2text = (htmlString: string) => {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.innerText;
}

export default html2text; 
