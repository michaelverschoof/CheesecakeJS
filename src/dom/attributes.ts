import { BODY, Elements } from './elements';
import { Parameters } from "../functions/parameters";

export namespace Attributes {

    export function find (attribute : string, element : HTMLElement = BODY, all : boolean = false) : string | string[] {
        return false === all
            ? findAttribute(attribute, element)
            : findAttributes(attribute, element);
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

    // --------------------------------------------------
    // Private functions
    // --------------------------------------------------

    function findAttribute (attribute : string, element : HTMLElement) : string {
        const found = Elements.first(brackify(attribute), element);
        return found ? found.getAttribute(getName(attribute)) : null;
    }

    function findAttributes (attribute : string, element : HTMLElement) : string[] {
        const found = Elements.all(brackify(attribute), element);
        return found ? found.map(el => el.getAttribute(getName(attribute))) : null;
    }

    function brackify (attribute : string) : string {
        return Parameters.startsWith('[', attribute) ? attribute : '[' + attribute + ']';
    }

    function getName (attribute : string) : string {
        return attribute.split('=')[0];
    }

}