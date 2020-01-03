import { Parameters } from "../functions/parameters";

export const BODY = document.body;

export namespace Elements {

    export function create (tag : string) : HTMLElement {
        return document.createElement(tag);
    }

    export function empty (element : HTMLElement = BODY) : HTMLElement {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        return element;
    }

    export function exists (selector : string, element : HTMLElement = BODY) : boolean {
        return findElement(selector, element) !== null
    }

    export function find (selector : string, element : HTMLElement = BODY, all : boolean = false) : HTMLElement | HTMLElement[] {
        return false === all
            ? findElement(selector, element)
            : findElements(selector, element);
    }

    export function all (selector : string, element : HTMLElement = BODY) : HTMLElement[] {
        return findElements(selector, element);
    }

    export function first (selector : string, element : HTMLElement = BODY) : HTMLElement {
        return findElement(selector, element);
    }

    export function last (selector : string, element : HTMLElement = BODY) : HTMLElement {
        const elements = findElements(selector, element);
        return elements[elements.length - 1] || null;
    }

    export function children (selector : string, element : HTMLElement = BODY) : HTMLElement[] {
        return findElements(selector, element);
    }

    export function siblings (selector : string, element : HTMLElement) : HTMLElement[] {
        return findElements(selector, element.parentElement).filter(el => el !== element)
    }

    export function append (children : HTMLElement | HTMLElement[], parent : HTMLElement) : void {
        for (let child of Parameters.elements(children)) {
            parent.appendChild(child);
        }
    }

    // --------------------------------------------------
    // Private functions
    // --------------------------------------------------

    function findElement (selector : string, element : HTMLElement) : HTMLElement {
        const selectors = getSelectors(selector);
        return element.querySelector<HTMLElement>(selectors);
    }

    function findElements (selector : string, element : HTMLElement) : HTMLElement[] {
        const selectors = getSelectors(selector);
        return Array.from(element.querySelectorAll<HTMLElement>(selectors)) || [];
    }

    function getSelectors (selectors : string) : string {
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