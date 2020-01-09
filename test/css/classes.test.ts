import { Classes } from '../../src/css/classes'
import { Elements } from '../../src/dom/elements';

test('Add single class', () => {
    const element = createElement('test');
    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Add multiple classes', () => {
    const element = createElement('test, other');
    expect(element.classList.length).toBe(2);
    expect(element.classList.contains('test')).toBe(true);
    expect(element.classList.contains('other')).toBe(true);
});

test('Remove single class', () => {
    const element = createElement('test, other');
    Classes.remove('other', element);
    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Remove single non-existent class', () => {
    const element = createElement('test, other');
    Classes.remove('more', element);
    expect(element.classList.length).toBe(2);
    expect(element.classList.contains('test')).toBe(true);
    expect(element.classList.contains('other')).toBe(true);
});

test('Remove multiple classes', () => {
    const element = createElement('test, other, more');
    Classes.remove('other, more', element);
    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Remove multiple classes with non-existent class', () => {
    const element = createElement('test, other');
    Classes.remove('other, more', element);
    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Single class found', () => {
    const element = createElement('test, other, more');
    expect(Classes.has('test', element)).toBe(true);
});

test('Single class not found', () => {
    const element = createElement('test, other');
    expect(Classes.has('more', element)).toBe(false);
});

test('Multiple classes found', () => {
    const element = createElement('test, other, more');
    expect(Classes.has('test, more', element)).toBe(true);
});

test('Multiple classes not found', () => {
    const element = createElement('test, other');
    expect(Classes.has('test, more', element)).toBe(false);
});

test('Replace single class', () => {
    const element = createElement('test');
    Classes.replace('test', 'other', element);
    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('other')).toBe(true);
});

test('Replace non-existent single class', () => {
    const element = createElement('test');
    Classes.replace('more', 'other', element);
    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Replace single class with multiple classes', () => {
    const element = createElement('test');
    Classes.replace('test', 'other, more', element);
    expect(element.classList.length).toBe(2);
    expect(element.classList.contains('other')).toBe(true);
    expect(element.classList.contains('more')).toBe(true);
});

test('Replace multiple classes with single class', () => {
    const element = createElement('test, other');
    Classes.replace('test, other', 'more', element);
    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('more')).toBe(true);
});

test('Replace multiple classes with multiple classes', () => {
    const element = createElement('test, other');
    Classes.replace('test, other', 'more, something, different', element);
    expect(element.classList.length).toBe(3);
    expect(element.classList.contains('more')).toBe(true);
    expect(element.classList.contains('something')).toBe(true);
    expect(element.classList.contains('different')).toBe(true);
});

test('Replace multiple classes with non-existent class', () => {
    const element = createElement('test, other');
    Classes.replace('test, more', 'something, different', element);
    expect(element.classList.length).toBe(2);
    expect(element.classList.contains('test')).toBe(true);
    expect(element.classList.contains('other')).toBe(true);
});

function createElement (classes : string) : HTMLElement {
    let element = Elements.create('div');
    Classes.add(classes, element);
    return element;
}
