import Component from './Component';
import JSXFactory from '@battis/jsx-factory';

export default class Fixture {
    public static readonly simpleHTML = '<div class="simple fixture"></div>';
    public static get simpleElement() {
        const e = document.createElement('div');
        e.className = 'simple fixture';
        return e;
    }
    public static verifySimpleElement(e: Element) {
        expect(e).toBeInstanceOf(HTMLDivElement);
        expect(e.className).toBe('simple fixture');
    }
    public static readonly nestedHTML =
        '<div class="nested fixture"><p><span></span></p></div>';
    public static get nestedElement() {
        return JSXFactory.elementFromSource(Fixture.nestedHTML)();
    }
    public static verifyNestedElement(e: Element) {
        expect(e).toBeInstanceOf(Element);
        expect(e).toBeInstanceOf(HTMLDivElement);
        expect(e.hasChildNodes()).toBeTruthy();
        expect(e.firstChild).toBeInstanceOf(HTMLParagraphElement);
        expect(e.firstChild?.hasChildNodes()).toBeTruthy();
        expect(e.firstChild?.firstChild).toBeInstanceOf(HTMLSpanElement);
        expect(e.firstChild?.firstChild?.hasChildNodes()).toBeFalsy();
        expect(e.isConnected).toBeFalsy();
    }
    private static A = class extends Component {
        props;

        constructor(props) {
            super();
            this.props = props;
        }

        render(children?) {
            return (this.element = <div {...this.props}>{children}</div>);
        }
    };

    private static B = class extends Component {
        props;

        constructor(props) {
            super();
            this.props = props;
        }

        render(children?) {
            return (this.element = <div {...this.props}>{children}</div>);
        }
    };

    public static readonly complexElement = (
        <Fixture.A>
            <Fixture.B>
                <p>foo</p>
            </Fixture.B>
            <p>bar</p>
            <Fixture.B>
                <p>baz</p>
            </Fixture.B>
        </Fixture.A>
    );
    public static verifyComplexElement(e: Element) {
        expect(Fixture.A.querySelector('div', e)).not.toBeNull();
        expect(Fixture.A.querySelector('span', e)).toBeNull();
        expect(Fixture.B.querySelector('div', e)).not.toBeNull();
        expect(Fixture.B.querySelector('span', e)).toBeNull();
    }
    public static verifyComplexElementAll(e: Element) {
        const flattenComponentArray = (components: Component[]): string => {
            return components.reduce((html, component) => {
                return html + component.element.outerHTML;
            }, '');
        };

        const a = Fixture.A.querySelectorAll('div', e);
        expect(a.length).toBe(1);
        expect(flattenComponentArray(a)).toBe(
            '<div><div><p>foo</p></div><p>bar</p><div><p>baz</p></div></div>'
        );

        const b = Fixture.B.querySelectorAll('div', e);
        expect(b.length).toBe(2);
        expect(flattenComponentArray(b)).toBe(
            '<div><p>foo</p></div><div><p>baz</p></div>'
        );
    }

    public static get children() {
        return [
            JSXFactory.createElement('div', { class: 'child fixture' }),
            JSXFactory.createElement('span', { class: 'child fixture' }),
            JSXFactory.createElement('p', { class: 'child fixture' })
        ];
    }
    public static verifyChildren(c: Component) {
        for (let i = 0; i < Fixture.children.length; i++) {
            expect(c.children![i]).toStrictEqual(Fixture.children[i]);
        }
    }

    public static readonly elementProperties = {
        class: 'foo',
        style: 'color: red;'
    };
    public static verifyElementProperties(e: Element) {
        expect(e.className).toBe('foo');
        expect((e as HTMLElement).style.color).toBe('red');
    }
}
