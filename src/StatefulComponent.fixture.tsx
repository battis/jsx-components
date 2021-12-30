import Component from './Component';
import ComponentFixture  from './Component.fixture';
import StatefulComponent from './StatefulComponent';
import JSXFactory from '@battis/jsx-factory';

export default class Fixture extends ComponentFixture {
    static objects: {}[] = [
        {
            string:
                'The quick brown fox jumps over the lazy dog. 0123 $%#@!   Test.',
            wholeNumber: 2,
            floatingPointNumber: 3.1459,
            object: {
                foo: 'bar',
                baz: 2
            },
            array: ['a', 'b', 'c'],
            nestedArray: [
                [1, 2, 3],
                ['x', 'y'],
                [
                    [9, 8, 7],
                    [1, 2, 3],
                    [6, 5, 4]
                ]
            ],
            component: new Component(<div class="component in state" />),
            nullValue: null,
            undefinedValue: undefined,
            function: (a, b) => `${b}.${a}`
        },
        {
            string: 'Lorem ipsum dolor. 987654 %#@!!    Foo barBaz.',
            wholeNumber: 42,
            floatingPointNumber: 2.1712,
            object: {
                bar: 'baz',
                barbar: 'fooblit',
                boggle: 321
            },
            array: [12, 42, 3],
            nestedArray: [
                'a',
                'b',
                ['c', 'd', 'e'],
                'f',
                [[1, 2, 3, [4, 5], 6, [7, 8]], 9, 0]
            ],
            component: new Component(<span class="span component in state" />),
            nullValue: null,
            undefinedValue: undefined,
            function: (x) => x * x
        }
    ];

    static get object() {
        return this.objects[0];
    }

    static verifyRenderValues(c: StatefulComponent, o: {}) {
        for (const key of Object.keys(o)) {
            const value = o[key];
            const html = c.element.querySelector(`.${key}`)?.innerHTML;
            if (key.charAt(0) === '_') {
                expect(html).toBeUndefined();
            } else {
                expect(typeof html).toBe('string');
                // TODO do we need a more critical examination of HTMl here?
            }
        }
    }
    static verifyState(c: StatefulComponent, obj?: {}) {
        if (!obj) {
            obj = this.object;
        }
        for (const key of Object.keys(obj)) {
            expect(c.state[key]).toBe(obj[key]);
        }
        for (const key of Object.keys(c.state)) {
            expect(obj[key]).toBe(c.state[key]);
        }
    }

    static verifyStatePropChangeAndRender(
        c: StatefulComponent,
        key: string,
        value: any
    ) {
        const html = () => c.element.querySelector(`.${key}`)?.innerHTML;
        const prevObj = { ...c.state };
        const prevHTML = html();
        c.state[key] = value;
        const currObj = { ...prevObj, [key]: value };
        const currHTML = html();
        this.verifyState(c, currObj);
        if (prevHTML === undefined) {
            expect(currHTML).toBeUndefined();
            c.render();
            expect(html()).toBeDefined();
        } else {
            expect(currHTML).toBeDefined();
            if (prevObj[key] !== value) {
                expect(currHTML).not.toBe(prevHTML);
            } else {
                expect(currHTML).toBe(prevHTML);
            }
        }
    }
}
