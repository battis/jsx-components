import { Nullable, Optional } from '@battis/typescript-tricks';
import { JSXComponent } from '@battis/jsx-factory';
export declare type ComponentConfig = Element | string | object;
export declare type ComponentizedElement = Element & {
    component: Component;
};
export declare function instanceOfComponentizedElement(obj: any): obj is ComponentizedElement;
export default class Component implements JSXComponent {
    private bindTo;
    protected _element: Nullable<ComponentizedElement>;
    getElement(): ComponentizedElement;
    get element(): ComponentizedElement;
    set element(element: Element);
    get htmlElement(): Optional<HTMLElement>;
    /**
     * Caution: replacing an element that is observed or has event listeners will NOT transfer that observation
     * @param element
     */
    setElement(element: Element): void;
    get children(): HTMLCollection | undefined;
    getChildren(): HTMLCollection | undefined;
    constructor(element?: ComponentConfig);
    render(children?: Element[]): Element;
    static for<T extends typeof Component>(this: T, element: Element): Nullable<InstanceType<T>>;
    static querySelector<T extends typeof Component>(this: T, selector: string, root?: Component | Element | Document): InstanceType<T> | null;
    static querySelectorAll<T extends typeof Component>(this: T, selector: string, root?: Component | Element | Document): InstanceType<T>[];
    static parent<T extends typeof Component>(this: T, element: Element): Nullable<InstanceType<T>>;
    get isConnected(): boolean;
}
