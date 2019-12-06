export namespace Classes {

    export function add (classes : string | string[], elements : HTMLElement | HTMLElement[]) : void {
        for (let element of parseElements(elements)) {
            element.classList.add(...parseStrings(classes));
        }
    }

    export function remove (classes : string | string[], elements : HTMLElement | HTMLElement[]) : void {
        for (let element of parseElements(elements)) {
            element.classList.remove(...parseStrings(classes));
        }
    }

    export function replace (search : string | string[], replace: string | string[], elements : HTMLElement | HTMLElement[]) : void {
        for (let element of parseElements(elements)) {
            if (has(search, element)) {
                element.classList.remove(...parseStrings(search));
                element.classList.add(...parseStrings(replace));
            }
        }
    }

    export function toggle (token: string, elements : HTMLElement | HTMLElement[], condition ?: boolean) {
        for (let element of parseElements(elements)) {
            element.classList.toggle(token, condition)
        }
    }

    export function has (classes : string | string[], element : HTMLElement) {
        return parseStrings(classes).some(c => element.classList.contains(c))
    }

}