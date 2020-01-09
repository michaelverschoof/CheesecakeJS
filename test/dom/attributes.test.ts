import { Attributes } from '../../src/dom/attributes';
import { Elements } from '../../src/dom/elements';

test('First attribute found', () => {
    const container = createElements();
    const result = Attributes.first('[test]', container);
    expect(result).toBe('first');
});

test('First attribute not found', () => {
    const container = createElements();
    const result = Attributes.first('[other]', container);
    expect(result).toBeNull();
});

test('Last attribute found', () => {
    const container = createElements();
    const result = Attributes.last('[test]', container);
    expect(result).toBe('last');
});

test('Last attribute not found', () => {
    const container = createElements();
    const result = Attributes.last('[other]', container);
    expect(result).toBeNull();
});

test('Attribute exists', () => {
    const container = createElements();
    const result = Attributes.exists('test', container);
    expect(result).toBe(true);
});

test('Attribute does not exist', () => {
    const container = createElements();
    const result = Attributes.exists('other', container);
    expect(result).toBe(false);
});

test('All attributes found', () => {
    const container = createElements();
    const result = Attributes.all('test', container);
    expect(result.length).toBe(3);
    expect(result.includes('first')).toBe(true);
    expect(result.includes('middle')).toBe(true);
    expect(result.includes('last')).toBe(true);
    expect(result.includes('other')).toBe(false);
});

test('All attributes not found', () => {
    const container = createElements();
    const result = Attributes.all('other', container);
    expect(result.length).toBe(0);
});

test('Single attribute found', () => {
    const container = createElements();
    const result = Attributes.find('test="middle"', container);
    expect(result).toBe('middle');
});

test('Single attribute not found', () => {
    const container = createElements();
    const result = Attributes.find('test="other"', container);
    expect(result).toBeNull();
});

test('Multiple attributes found', () => {
    const container = createElements();
    const result = Attributes.find('test', container, true);
    expect(result.length).toBe(3);
});

test('Multiple attributes not found', () => {
    const container = createElements();
    const result = Attributes.find('other', container, true);
    expect(result.length).toBe(0);
});

test('Get attribute from single element', () => {
    const container = createElements();
    const element = Elements.first('[test]', container);
    const result = Attributes.get('test', element);
    expect(result).toBe('first');
});

test('Get attribute from multiple elements', () => {
    const container = createElements();
    const elements = Elements.all('div', container);
    const result = Attributes.get('test', elements);
    expect(result.length).toBe(3);
    expect(result.includes('middle')).toBe(true);
});

test('Attributes not found when no elements are provided', () => {
    const all = Attributes.all('other');
    const first = Attributes.first('other');
    const last = Attributes.last('other');
    const single = Attributes.find('other');
    const exists = Attributes.exists('other');

    expect(all.length).toBe(0);
    expect(first).toBeNull();
    expect(last).toBeNull();
    expect(single).toBeNull();
    expect(exists).toBe(false);
});

function createElements () : HTMLElement {
    let first = Elements.create('div');
    first.setAttribute('test', 'first');
    let middle = Elements.create('div');
    middle.setAttribute('test', 'middle');
    let last = Elements.create('div');
    last.setAttribute('test', 'last');
    let more = Elements.create('div');
    more.setAttribute('more', 'something');

    const container = Elements.create('div');
    Elements.append([first, middle, last, more], container);

    return container;
}