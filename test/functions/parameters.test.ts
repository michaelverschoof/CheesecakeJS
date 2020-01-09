import { Parameters } from '../../src/functions/parameters';
import { Elements } from '../../src/dom/elements';

test('Single element results in an array with that element in it', () => {
    const element = Elements.create('div');
    const result = Parameters.elements(element);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(element);
});

test('Multiple elements results in an array with those elements in it', () => {
    const elements = [Elements.create('div'), Elements.create('div'), Elements.create('span'), Elements.create('a'), Elements.create('div')];
    const result = Parameters.elements(elements);
    expect(result.length).toBe(5);
});

test('Single parameter string results in an array with that string in it', () => {
    const values = 'parameters';
    const result = Parameters.strings(values);
    expect(result.length).toBe(1);
    expect(result[0]).toBe(values);
});

test('Multiple parameter string results in an array with those elements in it', () => {
    const values = 'we, have, , multiple, parameters';
    const result = Parameters.strings(values);
    expect(result.length).toBe(4);
    expect(result[2]).toBe('multiple');
});

test('Multiple parameter array results in an array with those elements in it', () => {
    const values = ['we', 'have', ' ', 'multiple', 'parameters'];
    const result = Parameters.strings(values);
    expect(result.length).toBe(4);
    expect(result[2]).toBe('multiple');
});

test('Starts with string', () => {
    const result = Parameters.startsWith('start', 'start of string');
    expect(result).toBe(true);
});

test('Does not start with string', () => {
    const result = Parameters.startsWith('string', 'start of string');
    expect(result).toBe(false);
});

test('Ends with string found', () => {
    const result = Parameters.endsWith('string', 'start of string');
    expect(result).toBe(true);
});

test('Ends with string not found', () => {
    const result = Parameters.endsWith('start', 'start of string');
    expect(result).toBe(false);
});

test('Strings not found', () => {
    let result = Parameters.startsWith('something', 'start of string');
    expect(result).toBe(false);

    result = Parameters.endsWith('something', 'start of string');
    expect(result).toBe(false);
});
