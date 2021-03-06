import JSXFactory, { render } from '@battis/jsx-factory';
import Component from './Component';
import Fixture from './Component.fixture';

export default class ComponentUnit {
    protected ComponentType: typeof Component;

    protected simplestInstance() {
        return new this.ComponentType();
    }

    protected get subclass() {
        return this.getSubclass();
    }

    protected getSubclass() {
        const CType = this.ComponentType;
        return class extends CType {
            public _element;
            props;
            constructor(props) {
                super();
                this.props = props;
            }
            render(children?) {
                return (this.element = <div {...this.props}>{children}</div>);
            }
        };
    }

    constructor(type: typeof Component = Component) {
        this.ComponentType = type;
        beforeEach(() => {
            document.body.innerHTML = '';
        });
        this.testConstructor();
        this.testConstructor_Element();
        this.testConstructor_string();
        this.testJSXElementProps();
        this.testPropChildren();
        this.testPropElement();
        this.testPropIsConnected();
        this.testStaticFor();
        this.testStaticQuerySelector();
        this.testStaticQuerySelectorAll();
        this.testHookRender();
        this.testHookRender_children();
        this.tests();
    }

    protected verifySimplestInstance(c) {
        expect(() => c.render()).toThrowError();
        expect(() => c.element).toThrowError();
    }

    protected testPropChildren() {
        test('children', () => {
            const c = this.simplestInstance();
            expect(
                c.children === undefined ||
                    (c.children instanceof HTMLCollection &&
                        c.children.length === 0)
            ).toBeTruthy();

            c.element = Fixture.simpleElement;
            expect(
                c.children === undefined ||
                    (c.children instanceof HTMLCollection &&
                        c.children.length === 0)
            ).toBeTruthy();

            c.render(Fixture.children);
            Fixture.verifyChildren(c);
        });
    }

    protected testStaticQuerySelector() {
        test('querySelector(string)', () => {
            render(Fixture.complexElement);
            Fixture.verifyComplexElement(document.body);
        });
    }

    protected testStaticQuerySelectorAll() {
        test(`querySelectorAll(string)`, () => {
            render(Fixture.complexElement);
            Fixture.verifyComplexElementAll(document.body);
        });
    }

    protected testHookRender_children() {
        test(`render(children)`, () => {
            const c = new this.ComponentType(Fixture.simpleElement);

            c.render(Fixture.children);
            Fixture.verifyChildren(c);
        });
    }

    protected testHookRender() {
        test(`render()`, () => {
            const c = new this.ComponentType(Fixture.simpleElement);
            expect(c.isConnected).toBeFalsy();

            const e = Fixture.simpleElement;
            c.element = e;
            expect(c.render()).toStrictEqual(e);
        });
    }

    protected testStaticFor() {
        test(`for()`, () => {
            let e = Fixture.simpleElement;
            const c = new this.ComponentType(e);
            expect(Component.for(e)).toStrictEqual(c);

            e = Fixture.simpleElement;
            expect(Component.for(e)).toBeNull();

            c.element = e;
            expect(Component.for(e)).toStrictEqual(c);
        });
    }

    protected testPropElement() {
        test('element', () => {
            const c = this.simplestInstance();
            this.verifySimplestInstance(c);

            let e = Fixture.simpleElement;
            c.element = e;
            expect(c.element).toStrictEqual(e);
            expect(this.ComponentType.for(e)).toStrictEqual(c);
            expect(c.isConnected).toBeFalsy();

            document.body.appendChild(e);
            expect(e.isConnected).toBeTruthy();
            expect(c.isConnected).toBeTruthy();

            e = <p />;
            expect(c.element).not.toStrictEqual(e);

            c.element = e;
            expect(c.element).toStrictEqual(e);
            expect(this.ComponentType.for(e)).toStrictEqual(c);
            expect(c.isConnected).toBeTruthy();
            expect(Component.for(e)).toStrictEqual(c);
        });
    }

    protected testPropIsConnected() {
        test('isConnected', () => {
            const c = new this.ComponentType(Fixture.simpleElement);
            expect(c.isConnected).toBeFalsy();
            document.body.appendChild(c.element);
            expect(c.isConnected).toBeTruthy();
        });
    }

    protected testConstructor_string() {
        test('constructor(string)', () => {
            Fixture.verifySimpleElement(
                new this.ComponentType(Fixture.simpleHTML).render()
            );

            const c = new this.ComponentType(Fixture.nestedHTML);
            Fixture.verifyNestedElement(c.element);
        });
    }

    protected testConstructor_Element() {
        test('constructor(Element)', () => {
            Fixture.verifySimpleElement(
                new this.ComponentType(Fixture.simpleElement).render()
            );

            const c = new this.ComponentType(Fixture.nestedElement);
            Fixture.verifyNestedElement(c.element);
        });
    }

    protected testConstructor() {
        test('constructor()', () => {
            const c = new this.ComponentType();
            this.verifySimplestInstance(c);

            c.element = Fixture.nestedElement;
            Fixture.verifyNestedElement(c.element);
        });
    }

    protected testJSXElementProps() {
        test('apply element properties', () => {
            document.body.appendChild(
                <this.subclass {...Fixture.elementProperties}>
                    {Fixture.children}
                </this.subclass>
            );
            const t = this.subclass.querySelector('div')!;
            expect(t).toBeInstanceOf(this.ComponentType);
            Fixture.verifyElementProperties(t.element);
            Fixture.verifyChildren(t);
        });
    }

    protected tests() {
        // intentionally empty
    }
}
