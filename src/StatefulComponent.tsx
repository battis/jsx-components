import JSXFactory, { render } from '@battis/jsx-factory';
import { Optional } from '@battis/typescript-tricks';
import Component from './Component';

type State = { [key: string]: any };

export default class StatefulComponent extends Component {
    public state: State;

    public setElement(element) {
        super.setElement(element);
        for (const key in this.state) {
            this.onStateChange(key, this.state[key]);
        }
    }

    public getChildren() {
        return this.element.querySelector('.children')?.children;
    }

    // FIXME there is serious potential for confusion between a single object argument that could be either an initial state or properties
    public constructor(...args) {
        let element: Optional<string | HTMLElement> = undefined;
        let data: State = {};
        if (args.length) {
            if (args[0] instanceof HTMLElement || typeof args[0] === 'string') {
                [element, data = {}] = args;
            } else {
                [data] = args;
            }
        }
        super(element);

        this.state = new Proxy(data, {
            set: (state: {}, key: string, value: any): boolean => {
                state[key] = value;
                this.onStateChange(key, value);
                return true;
            }
        });
    }

    public render(children?) {
        if (!this._element) {
            this._element = <div />;
        }
        const keys = Object.getOwnPropertyNames(this.state).filter((prop) =>
            this.isRenderableProperty(prop)
        );
        if (this._element) {
            render(
                this._element,
                <>
                    <div class="type">{this.constructor.name}</div>
                    <div class="state">
                        {keys.map((key) => (
                            <div>
                                <span class="label">{key}</span>
                                <span class={key}>
                                    {this.renderProperty(key)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div class="children">{children}</div>
                </>
            );
        }
        return this._element!;
    }

    protected onStateChange(key, value) {
        if (this.isRenderableProperty(key)) {
            const elements = this.element?.querySelectorAll(
                `.${key.toString()}`
            );

            let renderStrategy: (e: Element) => void;
            if (value instanceof Component) {
                renderStrategy = (element) => render(element, value.element);
            } else {
                const elementValue = this.renderValue(value, key);
                renderStrategy = (element) =>
                    (element.innerHTML = elementValue);
            }

            for (let i = 0; elements && i < elements.length; i++) {
                if (StatefulComponent.parent(elements[i]) === this) {
                    renderStrategy(elements[i]);
                }
            }
        }
    }

    /**
     * Test if a property should be rendered within a DataComponent. By default ES6 private properties (named starting with _) are not rendered.
     * @param key
     * @param exclude
     * @protected
     */
    protected isRenderableProperty(key: string, exclude: string[] = []) {
        return (
            key.charAt(0) !== '_' &&
            key.substr(-3) !== '_id' &&
            !exclude.includes(key)
        );
    }

    /**
     * Render a particular property of a DataComponent. BY default if the property is itself a DataComponent, it is rendered, otherwise it is displayed "as is."
     * @param key
     * @protected
     */
    protected renderProperty(key) {
        const value = this.state[key];
        if (value instanceof Component) {
            return value.element;
        }
        return this.renderValue(value, key);
    }

    /**
     * Render the value of a property. All values are converted to strings, arrays are recursively converted to strings.
     * @param value
     * @param key
     * @protected
     */
    protected renderValue(value: any, key: string) {
        if (typeof value === 'function') {
            return value.toString();
        } else if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    }
}
