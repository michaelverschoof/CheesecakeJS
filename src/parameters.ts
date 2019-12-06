function parseElements (elements : HTMLElement | HTMLElement[]) : HTMLElement[] {
    if (elements instanceof Array) {
        return elements;
    }
    return [elements];
}

function parseStrings (strings : string | string[]) : string[] {
    if (strings instanceof Array) {
        return strings;
    }
    return strings.split(',').map(item => item.trim());
}