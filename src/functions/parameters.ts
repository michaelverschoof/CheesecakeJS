export namespace Parameters {

    export function elements (elements : HTMLElement | HTMLElement[]) : HTMLElement[] {
        if (elements instanceof Array) {
            return elements;
        }
        return [elements];
    }

    export function strings (strings : string | string[]) : string[] {
        if (strings instanceof Array) {
            return strings.filter(
                item => '' !== item.trim()
            );
        }

        return strings.split(',').reduce(
            (result : string[], item : string) => {
                if ('' !== item.trim()) {
                    result.push(item.trim())
                }
                return result;
            }, []
        );
    }

    export function startsWith (needle : string, haystack : string) : boolean {
        return haystack.indexOf(needle) === 0;
    }

    export function endsWith (needle : string, haystack : string) : boolean {
        return haystack.indexOf(needle) === (haystack.length - needle.length);
    }

}