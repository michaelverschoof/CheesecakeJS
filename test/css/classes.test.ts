import { Classes } from '../../src/css/classes'
import { Elements } from '../../src/dom/elements';

test('Add single class', () => {
    const element = createElement();
    Classes.add('test', element);

    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Add multiple classes', () => {
    const element = createElement();
    Classes.add('test, other', element);

    expect(element.classList.length).toBe(2);
    expect(element.classList.contains('test')).toBe(true);
    expect(element.classList.contains('other')).toBe(true);
});

test('Remove single class', () => {
    const element = createElement();
    Classes.add('test, other', element);
    Classes.remove('other', element);

    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Remove single non-existent class', () => {
    const element = createElement();
    Classes.add('test, other', element);
    Classes.remove('more', element);

    expect(element.classList.length).toBe(2);
    expect(element.classList.contains('test')).toBe(true);
    expect(element.classList.contains('other')).toBe(true);
});

test('Remove multiple classes', () => {
    const element = createElement();
    Classes.add('test, other, more', element);
    Classes.remove('other, more', element);

    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Remove multiple classes with non-existent class', () => {
    const element = createElement();
    Classes.add('test, other', element);
    Classes.remove('other, more', element);

    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Single class found', () => {
    const element = createElement();
    Classes.add('test, other, more', element);

    expect(Classes.has('test', element)).toBe(true);
});

test('Single class not found', () => {
    const element = createElement();
    Classes.add('test, other', element);

    expect(Classes.has('more', element)).toBe(false);
});

test('Multiple classes found', () => {
    const element = createElement();
    Classes.add('test, other, more', element);

    expect(Classes.has('test, more', element)).toBe(true);
});

test('Multiple classes not found', () => {
    const element = createElement();
    Classes.add('test, other', element);

    expect(Classes.has('test, more', element)).toBe(false);
});

test('Replace single class', () => {
    const element = createElement();
    Classes.add('test', element);
    Classes.replace('test', 'other', element);

    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('other')).toBe(true);
});

test('Replace non-existent single class', () => {
    const element = createElement();
    Classes.add('test', element);
    Classes.replace('more', 'other', element);

    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('test')).toBe(true);
});

test('Replace single class with multiple classes', () => {
    const element = createElement();
    Classes.add('test', element);
    Classes.replace('test', 'other, more', element);

    expect(element.classList.length).toBe(2);
    expect(element.classList.contains('other')).toBe(true);
    expect(element.classList.contains('more')).toBe(true);
});

test('Replace multiple classes with single class', () => {
    const element = createElement();
    Classes.add('test, other', element);
    Classes.replace('test, other', 'more', element);

    expect(element.classList.length).toBe(1);
    expect(element.classList.contains('more')).toBe(true);
});

test('Replace multiple classes with multiple classes', () => {
    const element = createElement();
    Classes.add('test, other', element);
    Classes.replace('test, other', 'more, something, different', element);

    expect(element.classList.length).toBe(3);
    expect(element.classList.contains('more')).toBe(true);
    expect(element.classList.contains('something')).toBe(true);
    expect(element.classList.contains('different')).toBe(true);
});

test('Replace multiple classes with non-existent class', () => {
    const element = createElement();
    Classes.add('test, other', element);
    Classes.replace('test, more', 'something, different', element);

    expect(element.classList.length).toBe(2);
    expect(element.classList.contains('test')).toBe(true);
    expect(element.classList.contains('other')).toBe(true);
});

// TODO: ADD TOGGLE TESTS

function createElement () : HTMLElement {
    return Elements.create('div');
}
