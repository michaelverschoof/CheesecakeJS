import { Elements } from '../../src/dom/elements';

test('Create element', () => {
    const div = Elements.create('div');
    const anchor = Elements.create('a');
    const element = Elements.create('element');

    expect(div instanceof HTMLDivElement).toBe(true);
    expect(anchor instanceof HTMLAnchorElement).toBe(true);
    expect(element instanceof HTMLUnknownElement).toBe(true);
});

test('Empty element', () => {
    const element = createElements();
    expect(element.childElementCount).toBe(2);

    const result = Elements.empty(element);
    expect(result.childElementCount).toBe(0);
});

test('Element exists', () => {
    const element = createElements();
    const result = Elements.exists('a', element);
    expect(result).toBe(true);
});

test('Element exists by data attribute', () => {
    const element = createElements();
    let brackets = Elements.exists('[data-something]', element);
    let bracketless = Elements.exists('data-something', element);
    expect(brackets).toBe(true);
    expect(bracketless).toBe(true);
});

test('Element does not exist', () => {
    const element = createElements();
    const result = Elements.exists('input', element);
    expect(result).toBe(false);
});

test('Find all elements', () => {
    const element = createElements();
    const result = Elements.all('span', element);
    expect(result.length).toBe(1);
});

test('Do not find any elements', () => {
    const element = createElements();
    const result = Elements.all('input', element);
    expect(result.length).toBe(0);
});

test('Find first element', () => {
    const element = createElements();
    const result = Elements.first('a', element);
    expect(result instanceof HTMLAnchorElement).toBe(true);
});

test('Do not find first element', () => {
    const element = createElements();
    const result = Elements.first('input', element);
    expect(result).toBeNull();
});

test('Find last element', () => {
    const element = createElements();
    const result = Elements.last('a', element);
    expect(result instanceof HTMLAnchorElement).toBe(true);
});

test('Do not find last element', () => {
    const element = createElements();
    const result = Elements.first('input', element);
    expect(result).toBeNull();
});

test('Find elements without "all" parameter', () => {
    const element = createElements();
    const result = Elements.find('span', element);
    expect(result instanceof HTMLSpanElement).toBe(true);
});

test('Find elements with "all" parameter', () => {
    const element = createElements();
    const result = Elements.find('span', element, true);
    expect(result instanceof Array && result.length === 1).toBe(true);
});

test('Find all children', () => {
    const element = createElements();
    const result = Elements.children(element);
    expect(result.length).toBe(2);
});

test('Find no children', () => {
    const element = createElements();
    const anchor = Elements.first('a', element);
    const result = Elements.children(anchor);
    console.log(result);
    expect(result.length).toBe(0);
});

test('Find all siblings', () => {
    const element = createElements();
    const span = Elements.first('span', element);
    const result = Elements.siblings(span);
    expect(result.length).toBe(1);
});

test('Find no siblings', () => {
    const element = createElements();
    const anchor = Elements.first('a', element);
    const result = Elements.siblings(anchor);
    expect(result.length).toBe(0);
});

test('Elements found when no elements are provided', () => {
    let container = createElements();
    document.body.appendChild(container);

    const all = Elements.all('span');
    const single = Elements.find('span');
    const first = Elements.first('p');
    const last = Elements.last('div');
    const exists = Elements.exists('a');

    expect(all.length).toBe(1);
    expect(single instanceof HTMLSpanElement).toBe(true);
    expect(first instanceof HTMLParagraphElement).toBe(true);
    expect(last instanceof HTMLDivElement).toBe(true);
    expect(exists).toBe(true);
});

test('Elements not found when no elements are provided', () => {
    let container = createElements();
    document.body.appendChild(container);

    const all = Elements.all('input');
    const single = Elements.find('input');
    const first = Elements.first('i');
    const last = Elements.last('b');
    const exists = Elements.exists('textarea');

    expect(all.length).toBe(0);
    expect(single).toBeNull();
    expect(first).toBeNull();
    expect(last).toBeNull();
    expect(exists).toBe(false);
});

function createElements () : HTMLElement {
    const first = Elements.create('span');
    const last = Elements.create('p');

    const deeper = Elements.create('a');
    deeper.setAttribute('data-something', '');
    Elements.append(deeper, first);

    let container = Elements.create('div');
    Elements.append([first, last], container);

    return container;
}