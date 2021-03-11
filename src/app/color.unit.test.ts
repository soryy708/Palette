import { strict as assert } from 'assert';
import { stringifyColor, rgbToHex, rgbToHsl, hslToRgb, Color, RgbColor, HexColor, HslColor } from './color';

const withinDelta = (a: number, b: number, delta = 0.001) => Math.abs(a - b) < delta;

const assertHslEqual = (c1: HslColor, c2: HslColor, delta = 0.001) => {
    assert.ok(withinDelta(c1.h, c2.h, delta), `${c1.h} ~= ${c2.h}`);
    assert.ok(withinDelta(c1.s, c2.s, delta), `${c1.s} ~= ${c2.s}`);
    assert.ok(withinDelta(c1.l, c2.l, delta), `${c1.l} ~= ${c2.l}`);
};

const assertRgbEqual = (c1: RgbColor, c2: RgbColor, delta = 0.001) => {
    assert.ok(withinDelta(c1.r, c2.r, delta), `${c1.r} ~= ${c2.r}`);
    assert.ok(withinDelta(c1.g, c2.g, delta), `${c1.g} ~= ${c2.g}`);
    assert.ok(withinDelta(c1.b, c2.b, delta), `${c1.b} ~= ${c2.b}`);
};

describe('color', () => {
    describe('stringifyColor', () => {
        const cases: {input: Color; expected: string}[] = [{
            input: {r: 0, g: 0, b: 0},
            expected: '(0, 0, 0)',
        }, {
            input: {r: 255, g: 0, b: 0},
            expected: '(255, 0, 0)',
        }, {
            input: {r: 0, g: 255, b: 0},
            expected: '(0, 255, 0)',
        }, {
            input: {r: 0, g: 0, b: 255},
            expected: '(0, 0, 255)',
        }, {
            input: {r: 255, g: 255, b: 0},
            expected: '(255, 255, 0)',
        }, {
            input: {r: 255, g: 0, b: 255},
            expected: '(255, 0, 255)',
        }, {
            input: {r: 0, g: 255, b: 255},
            expected: '(0, 255, 255)',
        }, {
            input: {r: 255, g: 255, b: 255},
            expected: '(255, 255, 255)',
        }, {
            input: {r: 32, g: 64, b: 128},
            expected: '(32, 64, 128)',
        }];

        cases.forEach((testCase, i) => {
            it(`${i}`, () => {
                const actual = stringifyColor(testCase.input);
                assert.strictEqual(actual, testCase.expected);
            });
        });

    });

    describe('rgbToHex', () => {
        const cases: {input: RgbColor; expected: HexColor}[] = [{
            input: {r: 0, g: 0, b: 0},
            expected: '#000000',
        }, {
            input: {r: 255, g: 0, b: 0},
            expected: '#FF0000',
        }, {
            input: {r: 0, g: 255, b: 0},
            expected: '#00FF00',
        }, {
            input: {r: 0, g: 0, b: 255},
            expected: '#0000FF',
        }, {
            input: {r: 255, g: 255, b: 0},
            expected: '#FFFF00',
        }, {
            input: {r: 255, g: 0, b: 255},
            expected: '#FF00FF',
        }, {
            input: {r: 0, g: 255, b: 255},
            expected: '#00FFFF',
        }, {
            input: {r: 255, g: 255, b: 255},
            expected: '#FFFFFF',
        }, {
            input: {r: 32, g: 64, b: 128},
            expected: '#204080',
        }];

        cases.forEach((testCase) => {
            it(`${stringifyColor(testCase.input)} => ${testCase.expected}`, () => {
                const actual = rgbToHex(testCase.input);
                assert.strictEqual(actual, testCase.expected);
            });
        });
    });

    describe('rgbToHsl', () => {
        const cases: {input: RgbColor; expected: HslColor}[] = [{
            input: {r: 0, g: 0, b: 0},
            expected: {h: 0, s: 0, l: 0},
        }, {
            input: {r: 255, g: 0, b: 0},
            expected: {h: 0, s: 1, l: 0.5},
        }, {
            input: {r: 0, g: 255, b: 0},
            expected: {h: 120, s: 1, l: 0.5},
        }, {
            input: {r: 0, g: 0, b: 255},
            expected: {h: 240, s: 1, l: 0.5},
        }, {
            input: {r: 255, g: 255, b: 0},
            expected: {h: 60, s: 1, l: 0.5},
        }, {
            input: {r: 255, g: 0, b: 255},
            expected: {h: 300, s: 1, l: 0.5},
        }, {
            input: {r: 0, g: 255, b: 255},
            expected: {h: 180, s: 1, l: 0.5},
        }, {
            input: {r: 255, g: 255, b: 255},
            expected: {h: 0, s: 0, l: 1},
        }, {
            input: {r: 32, g: 64, b: 128},
            expected: {h: 220, s: 0.6, l: 0.314},
        }, {
            input: {r: 0, g: 0, b: 0},
            expected: {h: 0, s: 0, l: 0},
        }, {
            input: {r: 128, g: 128, b: 255},
            expected: {h: 240, s: 1, l: 0.751},
        }];

        cases.forEach(testCase => {
            it(`${stringifyColor(testCase.input)} => ${stringifyColor(testCase.expected)}`, () => {
                const actual = rgbToHsl(testCase.input);
                assertHslEqual(actual, testCase.expected);
            });
        });
    });

    describe('hslToRgb', () => {
        const cases: {input: HslColor; expected: RgbColor}[] = [{
            input: {h: 0, s: 0, l: 0},
            expected: {r: 0, g: 0, b: 0},
        }, {
            input: {h: 0, s: 1, l: 0.5},
            expected: {r: 255, g: 0, b: 0},
        }, {
            input: {h: 120, s: 1, l: 0.5},
            expected: {r: 0, g: 255, b: 0},
        }, {
            input: {h: 240, s: 1, l: 0.5},
            expected: {r: 0, g: 0, b: 255},
        }, {
            input: {h: 60, s: 1, l: 0.5},
            expected: {r: 255, g: 255, b: 0},
        }, {
            input: {h: 300, s: 1, l: 0.5},
            expected: {r: 255, g: 0, b: 255},
        }, {
            input: {h: 180, s: 1, l: 0.5},
            expected: {r: 0, g: 255, b: 255},
        }, {
            input: {h: 0, s: 0, l: 1},
            expected: {r: 255, g: 255, b: 255},
        }, {
            input: {h: 220, s: 0.6, l: 0.314},
            expected: {r: 32, g: 64, b: 128},
        }, {
            input: {h: 0, s: 0, l: 0},
            expected: {r: 0, g: 0, b: 0},
        }, {
            input: {h: 240, s: 1, l: 0.751},
            expected: {r: 128, g: 128, b: 255},
        }];

        cases.forEach(testCase => {
            it(`${stringifyColor(testCase.input)} => ${stringifyColor(testCase.expected)}`, () => {
                const actual = hslToRgb(testCase.input);
                assertRgbEqual(actual, testCase.expected);
            });
        });
    });
});
