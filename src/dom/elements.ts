import { Classes } from "../styles/classes";

export namespace Elements {

    export function create (tag: string, classes ?: string[]): HTMLElement {
        let element = document.createElement(tag);
        Classes.add(classes, element);
        return element;
    }

    export function empty (element: HTMLElement): HTMLElement {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        return element;
    }

    export function exists (selector: string, element ?: HTMLElement): boolean {
        return selectElement(selector, element) !== null
    }

    export function find (selector: string, element: HTMLElement, all = false): HTMLElement | HTMLElement[] {
        return false === all
            ? selectElement(selector, element)
            : selectElements(selector, element);
    }

    export function children (selector: string, element: HTMLElement): HTMLElement[] {
        return selectElements(selector, element);
    }

    export function siblings (selector: string, element: HTMLElement): HTMLElement[] | null {
        return selectElements(selector, element.parentElement).filter(el => el !== element)
    }


// --------------------------------------------------
// Private functions
// --------------------------------------------------
    function selectElement (selector: string, element = document.body): HTMLElement | null {
        const selectors = getSelectors(selector);
        return element.querySelector<HTMLElement>(selectors);
    }

    function selectElements (selector: string, element = document.body): HTMLElement[] | null {
        const selectors = getSelectors(selector);
        return Array.from(element.querySelectorAll<HTMLElement>(selectors));
    }

    function getSelectors (selectors: string) {
        return selectors
            .split(',')
            .map(selector =>
                selector
                    .trim()
                    .split(' ')
                    .map(part => part.indexOf('data-') === 0 ? '[' + part + ']' : part)
                    .join(' '))
            .join(',');
    }
}