import { Parameters } from '../functions/parameters';

export namespace Classes {

    export function add (classes : string | string[], ...elements : HTMLElement[]) : void {
        for (let element of elements) {
            element.classList.add(...Parameters.strings(classes));
        }
    }

    export function remove (classes : string | string[], ...elements : HTMLElement[]) : void {
        for (let element of elements) {
            element.classList.remove(...Parameters.strings(classes));
        }
    }

    export function replace (search : string | string[], replace: string | string[], ...elements : HTMLElement[]) : void {
        for (let element of elements) {
            if (has(search, element)) {
                remove(search, element);
                add(replace, element);
            }
        }
    }

    export function toggle (token : string, elements : HTMLElement | HTMLElement[], condition : boolean = true) {
        for (let element of Parameters.elements(elements)) {
            element.classList.toggle(token, condition)
        }
    }

    export function has (classes : string | string[], element : HTMLElement) {
        return Parameters.strings(classes).every(c => element.classList.contains(c))
    }

}