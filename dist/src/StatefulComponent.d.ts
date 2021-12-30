import Component from './Component';
declare type State = {
    [key: string]: any;
};
export default class StatefulComponent extends Component {
    state: State;
    setElement(element: any): void;
    getChildren(): HTMLCollection | undefined;
    constructor(...args: any[]);
    render(children?: any): import("./Component").ComponentizedElement;
    protected onStateChange(key: any, value: any): void;
    /**
     * Test if a property should be rendered within a DataComponent. By default ES6 private properties (named starting with _) are not rendered.
     * @param key
     * @param exclude
     * @protected
     */
    protected isRenderableProperty(key: string, exclude?: string[]): boolean;
    /**
     * Render a particular property of a DataComponent. BY default if the property is itself a DataComponent, it is rendered, otherwise it is displayed "as is."
     * @param key
     * @protected
     */
    protected renderProperty(key: any): any;
    /**
     * Render the value of a property. All values are converted to strings, arrays are recursively converted to strings.
     * @param value
     * @param key
     * @protected
     */
    protected renderValue(value: any, key: string): any;
}
export {};
