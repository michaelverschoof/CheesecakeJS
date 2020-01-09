import { BODY, Elements } from './elements';
import { Parameters } from '../functions/parameters';

export namespace Attributes {

    export function find (attribute : string, element : HTMLElement = BODY, all : boolean = false) : string | string[] {
        return all ? findAttributes(attribute, element) : findAttribute(attribute, element);
    }

    export function all (attribute : string, element : HTMLElement = BODY) : string[] {
        return findAttributes(attribute, element);
    }

    export function first (attribute : string, element : HTMLElement = BODY) : string {
        return findAttribute(attribute, element);
    }

    export function last (attribute : string, element : HTMLElement = BODY) : string {
        const attributes = findAttributes(attribute, element);
        return attributes[attributes.length - 1] || null;
    }

    export function exists (attribute : string, element : HTMLElement = BODY) : boolean {
        return findAttribute(attribute, element) !== null
    }

    export function get (attribute : string, elements : HTMLElement | HTMLElement[]) : string | string[] {
        if (elements instanceof HTMLElement) {
            return getAttribute(attribute, elements);
        }
        return getAttributes(attribute, Parameters.elements(elements));
    }

    // --------------------------------------------------
    // Private functions
    // --------------------------------------------------

    function findAttribute (attribute : string, element : HTMLElement) : string {
        const found = Elements.first(brackify(attribute), element);
        return getAttribute(attribute, found);
    }

    function findAttributes (attribute : string, element : HTMLElement) : string[] {
        const found = Elements.all(brackify(attribute), element);
        return getAttributes(attribute, found);
    }

    function getAttribute (attribute : string, element : HTMLElement) : string {
        const name = getName(attribute);
        return element && element.hasAttribute(name) ? element.getAttribute(name) : null;
    }

    function getAttributes (attribute : string, elements : HTMLElement[]) : string[] {
        const name = getName(attribute);
        return elements.reduce(
            (result : string[], element : HTMLElement) => {
                if (element.hasAttribute(name)) {
                    result.push(element.getAttribute(name))
                }
                return result;
            }, []
        );
    }

    function brackify (attribute : string) : string {
        return Parameters.startsWith('[', attribute) ? attribute : '[' + attribute + ']';
    }

    function unbrackify (attribute : string) : string {
        return Parameters.startsWith('[', attribute) ? attribute.substring(1, attribute.length - 1) : attribute;
    }

    function getName (attribute : string) : string {
        const unbrackified = unbrackify(attribute);
        return unbrackified.split('=')[0];
    }

}