import { Elements } from "./elements";

namespace Attributes {
    export function findAttribute (attribute : string, element = document.body) : string {
        const selected = Elements.find(attribute, element);
        return selected instanceof HTMLElement
            ? selected.getAttribute(attribute)
            : null;
    }

    export function findAttributes (attribute : string, element = document.body) : string[] {
        const selected = Elements.find(attribute, element, true);
        return selected instanceof Array
            ? selected.map(el => el.getAttribute(attribute))
            : null;
    }

    export function hasAttribute (attribute : string, element : HTMLElement) {
        return element.hasAttribute(attribute);
    }
}