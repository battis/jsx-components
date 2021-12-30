import Identifier from '@battis/identifier';
import JSXFactory from '@battis/jsx-factory';
import ComponentUnit from './Component.unit';
import StatefulComponent from './StatefulComponent';
import Fixture from './StatefulComponent.fixture';

export default class StatefulComponentUnit extends ComponentUnit {
    protected ComponentType: typeof StatefulComponent;

    protected getSubclass() {
        return class extends super.getSubclass() {
            render(children?) {
                return (this.element = (
                    <div {...this.props}>
                        <div class="children">{children}</div>
                    </div>
                ));
            }
        };
    }

    constructor(type: typeof StatefulComponent = StatefulComponent) {
        super(type);
        this.ComponentType = type;
    }

    protected verifySimplestInstance(c) {
        expect(() => c.render()).not.toThrowError();
        expect(() => c.element).not.toThrowError();
    }

    protected testHookRender_children() {
        test('render(children)', () => {
            const c = new this.ComponentType(<div />);

            c.render(Fixture.children);
            for (let i = 0; i < Fixture.children.length; i++) {
                expect(
                    c.element.querySelector('.children')!.children[i]
                ).toStrictEqual(Fixture.children[i]);
            }
        });
    }

    protected tests() {
        super.tests();
        this.testConstructor_object();
        this.testConstructor_string_object();
        this.testConstructor_Element_object();
        this.testPropState();
        this.testHookIsRenderableProperty_string();
        this.testHookIsRenderableProperty_string_array();
        this.testHookRenderProperty_string();
        this.testHookRenderValue_any();
        this.testHookRenderValue_any_string();
        this.testHookOnStateChange_string_any();
    }

    protected testConstructor_object() {
        test('constructor(object)', () => {
            const c = new this.ComponentType({ ...Fixture.object });
            Fixture.verifyState(c);

            c.render();
            for (const key in Fixture.object) {
                expect(c.element.querySelector(`.${key}`)).not.toBeNull();
            }
        });
    }

    protected testConstructor_string_object() {
        test('constructor(string, object)', () => {
            const c = new this.ComponentType(Fixture.simpleHTML, {
                ...Fixture.object
            });
            this.verifySimplestInstance(c);
            Fixture.verifySimpleElement(c.element);
            Fixture.verifyState(c);
        });
    }

    protected testConstructor_Element_object() {
        test('constructor(Element, object)', () => {
            const c = new this.ComponentType(Fixture.simpleElement, {
                ...Fixture.object
            });
            this.verifySimplestInstance(c);
            Fixture.verifySimpleElement(c.element);
            Fixture.verifyState(c);
            expect(c.isConnected).toBeFalsy();
        });
    }

    protected testPropState() {
        test('state', () => {
            let c = new this.ComponentType({ ...Fixture.object });
            Fixture.verifyState(c);

            c.render();

            for (let i = 1; i < Fixture.objects.length; i++) {
                for (const key of Object.keys(Fixture.objects[i])) {
                    Fixture.verifyStatePropChangeAndRender(
                        c,
                        key,
                        Fixture.objects[i][key]
                    );
                }
                Fixture.verifyState(c, Fixture.objects[i]);
            }

            const targetKeys = Object.keys(Fixture.object);
            for (let i = 1; i < Fixture.objects.length; i++) {
                const sourceKeys = Object.keys(Fixture.objects[i]);
                for (const targetKey of targetKeys) {
                    for (const sourceKey of sourceKeys) {
                        c = new this.ComponentType({ ...Fixture.object });
                        Fixture.verifyStatePropChangeAndRender(
                            c,
                            targetKey,
                            Fixture.objects[i][sourceKey]
                        );
                    }
                }
            }

            c = new this.ComponentType({ ...Fixture.object });
            const key = 'x' + Identifier.identifier(10);
            const value = Identifier.identifier();
            Fixture.verifyStatePropChangeAndRender(c, key, value);
        });
    }

    protected get hookTestVars(): {
        Type: typeof StatefulComponent;
        customKey: string;
        customValue: string;
        value: string;
    } {
        const hook = {
            Type: this.ComponentType,
            customKey: 'x' + Identifier.identifier(10),
            customValue: Identifier.identifier(),
            value: Identifier.identifier()
        };
        while (hook.value === hook.customValue) {
            hook.value = Identifier.identifier();
        }
        return hook;
    }

    protected testHookIsRenderableProperty_string() {
        test('isRenderableProperty(string)', () => {
            const vars = this.hookTestVars;
            const HookTest = class extends vars.Type {
                protected isRenderableProperty(
                    key: string,
                    exclude: string[] = []
                ): boolean {
                    return (
                        key !== vars.customKey &&
                        super.isRenderableProperty(key, exclude)
                    );
                }
            };
            const c = new HookTest({
                ...Fixture.object,
                [vars.customKey]: vars.value
            });
            Fixture.verifyRenderValues(c, Fixture.object);
        });
    }

    protected testHookIsRenderableProperty_string_array() {
        test('isRenderableProperty(string, string[])', () => {
            const vars = this.hookTestVars;
            const HookTest = class extends vars.Type {
                protected isRenderableProperty(
                    key: string,
                    exclude: string[] = []
                ): boolean {
                    return super.isRenderableProperty(key, [
                        ...exclude,
                        vars.customKey
                    ]);
                }
            };
            const c = new HookTest({
                ...Fixture.object,
                [vars.customKey]: vars.value
            });
            Fixture.verifyRenderValues(c, Fixture.object);
        });
    }

    protected testHookRenderProperty_string() {
        test('renderProperty(string)', () => {
            const vars = this.hookTestVars;
            const HookTest = class extends vars.Type {
                protected renderProperty(key): Element {
                    if (key === vars.customKey) {
                        return <h1>{vars.customValue}</h1>;
                    }
                    return super.renderProperty(key);
                }
            };
            const c = new HookTest({
                ...Fixture.object,
                [vars.customKey]: vars.value
            });
            Fixture.verifyRenderValues(c, {
                ...Fixture.object,
                [vars.customKey]: `<h1>${vars.customValue}</h1>`
            });
        });
    }

    protected testHookRenderValue_any() {
        test('renderValue(any)', () => {
            const c = new this.ComponentType({ ...Fixture.object });
            Fixture.verifyRenderValues(c, Fixture.object);
        });
    }

    protected testHookRenderValue_any_string() {
        test('renderValue(any, string)', () => {
            const vars = this.hookTestVars;
            const HookTest = class extends vars.Type {
                protected renderValue(value: any, key: string): string {
                    if (key === vars.customKey) {
                        return vars.customValue;
                    }
                    return super.renderValue(value, key);
                }
            };
            const c = new HookTest({
                ...Fixture.object,
                [vars.customKey]: vars.value
            });
            Fixture.verifyRenderValues(c, {
                ...Fixture.object,
                [vars.customKey]: vars.customValue
            });
        });
    }

    protected testHookOnStateChange_string_any() {
        test('onStateChange(string, any)', () => {
            const vars = this.hookTestVars;
            const callback = jest.fn((v) => v === vars.value);
            const HookTest = class extends vars.Type {
                protected onStateChange(key, value) {
                    super.onStateChange(key, value);
                    if (key === vars.customKey) {
                        callback(value);
                    }
                }
            };
            const c = new HookTest({
                ...Fixture.object,
                [vars.customKey]: vars.value
            });
            expect(callback.mock.calls.length).toBe(0);

            c.state[vars.customKey] = vars.customValue;
            expect(callback.mock.calls.length).toBe(1);
            expect(callback.mock.results[0].value).toBeFalsy();

            c.state[vars.customKey] = vars.value;
            expect(callback.mock.calls.length).toBe(2);
            expect(callback.mock.results[1].value).toBeTruthy();
        });
    }
}
