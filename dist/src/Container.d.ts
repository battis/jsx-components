import Component from './Component';
export default class Container<T extends Component> extends Component {
    get children(): HTMLCollection;
    constructor(...args: any[]);
    add(child: T): void;
    protected appendChild(child: T): void;
    protected replaceChild(newChild: T, oldChild: T): void;
    protected insertBefore(newChild: T, refChild: T): void;
    addAll(children: T[]): void;
    remove(child: T): void;
    isEmpty(): boolean;
    clear(): void;
}
