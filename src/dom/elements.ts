import { Parameters } from '../functions/parameters';

export const BODY = document.body;

export namespace Elements {

    export function create (tag : string) : HTMLElement {
        return document.createElement(tag);
    }

    export function empty (element : HTMLElement) : HTMLElement {
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

    export function children (element : HTMLElement) : HTMLElement[] {
        return findChildElements(element);
    }

    export function siblings (element : HTMLElement) : HTMLElement[] {
        return findChildElements(element.parentElement).filter(sibling => sibling !== element)
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
        const found = element.querySelector(selectors);
        return found && found instanceof HTMLElement ? found : null
    }

    function findElements (selector : string, element : HTMLElement) : HTMLElement[] {
        const selectors = getSelectors(selector);
        const found = element.querySelectorAll(selectors);
        return filterElements(found);
    }

    function findChildElements (element : HTMLElement) : HTMLElement[] {
        return filterElements(element.children);
    }

    function filterElements (elements : NodeListOf<Element> | HTMLCollection) : HTMLElement[] {
        return Array.from(elements).reduce(
            (result : HTMLElement[], element : Element) => {
                if (element instanceof HTMLElement) {
                    result.push(element);
                }
                return result;
            }, []
        );
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