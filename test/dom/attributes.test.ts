import { Attributes } from '../../src/dom/attributes'
import { Elements } from '../../src/dom/elements';

test('First attribute found', () => {
    const container = createElements();
    const result = Attributes.first('test', container);
    expect(result).toBe('first');
});

test('First attribute not found', () => {
    const container = createElements();
    const result = Attributes.first('other', container);
    expect(result).toBeNull();
});

test('Last attribute found', () => {
    const container = createElements();
    const result = Attributes.last('test', container);
    expect(result).toBe('last');
});

test('Last attribute not found', () => {
    const container = createElements();
    const result = Attributes.last('other', container);
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

function createElements () : HTMLElement {
    const first = Elements.create('div');
    first.setAttribute('test', 'first');
    const middle = Elements.create('div');
    middle.setAttribute('test', 'middle');
    const last = Elements.create('div');
    last.setAttribute('test', 'last');

    let container = Elements.create('div');
    Elements.append(first, container);
    Elements.append(middle, container);
    Elements.append(last, container);

    return container;
}