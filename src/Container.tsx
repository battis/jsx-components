import JSXFactory from '@battis/jsx-factory';
import { instanceOfComparable } from './Comparable';
import Component from './Component';

export default class Container<T extends Component> extends Component {
    public get children() {
        return this.element.children;
    }

    public constructor(...args) {
        const [element = <div />, children = []] = args;
        super(element);
        this.addAll(children);
    }

    public add(child: T) {
        if (instanceOfComparable<T>(child)) {
            for (let i = 0; i < this.element.children.length; i++) {
                const sibling = this.element.children.item(i);

                // FIXME this is an unsafe assumption (that the component will always be instance of T)
                const siblingComponent =
                    sibling && (Component.for(sibling) as T);

                if (
                    siblingComponent &&
                    instanceOfComparable<T>(siblingComponent)
                ) {
                    if (siblingComponent.equals(child)) {
                        return this.replaceChild(child, siblingComponent);
                    } else if (siblingComponent.compareTo(child) >= 0) {
                        return this.insertBefore(child, siblingComponent);
                    }
                } else {
                    break;
                }
            }
        }
        this.appendChild(child);
    }

    protected appendChild(child: T) {
        if (child.element && this.element) {
            this.element.appendChild(child.element);
        }
    }

    protected replaceChild(newChild: T, oldChild: T) {
        for (const key of Object.getOwnPropertyNames(newChild)) {
            if (newChild[key] instanceof Container && key in oldChild) {
                newChild[key].addAll(oldChild[key].children);
            }
        }
        if (oldChild.isConnected) {
            this.element.replaceChild(newChild.element, oldChild.element);
        } else {
            console.error({
                parent: this.element,
                newChild: newChild.element,
                oldChild: oldChild.element
            });
            throw new TypeError();
        }
    }

    protected insertBefore(newChild: T, refChild: T) {
        if (newChild.element && refChild.element && this.element) {
            this.element.insertBefore(newChild.element, refChild.element);
        }
    }

    public addAll(children: T[]) {
        // TODO this is periodically receiving an HTMLCollection (hence Array.from()), e.g. when the count for an Entry is changed by the user
        Array.from(children).forEach((child) => this.add(child));
    }

    public remove(child: T) {
        child.element.remove();
    }

    public isEmpty() {
        return this.children.length > 0;
    }

    public clear() {
        this.element.innerHTML = '';
    }
}
