"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_factory_1 = __importDefault(require("@battis/jsx-factory"));
const Comparable_1 = require("./Comparable");
const Component_1 = __importDefault(require("./Component"));
class Container extends Component_1.default {
    get children() {
        return this.element.children;
    }
    constructor(...args) {
        const [element = jsx_factory_1.default.createElement("div", null), children = []] = args;
        super(element);
        this.addAll(children);
    }
    add(child) {
        if ((0, Comparable_1.instanceOfComparable)(child)) {
            for (let i = 0; i < this.element.children.length; i++) {
                const sibling = this.element.children.item(i);
                // FIXME this is an unsafe assumption (that the component will always be instance of T)
                const siblingComponent = sibling && Component_1.default.for(sibling);
                if (siblingComponent &&
                    (0, Comparable_1.instanceOfComparable)(siblingComponent)) {
                    if (siblingComponent.equals(child)) {
                        return this.replaceChild(child, siblingComponent);
                    }
                    else if (siblingComponent.compareTo(child) >= 0) {
                        return this.insertBefore(child, siblingComponent);
                    }
                }
                else {
                    break;
                }
            }
        }
        this.appendChild(child);
    }
    appendChild(child) {
        if (child.element && this.element) {
            this.element.appendChild(child.element);
        }
    }
    replaceChild(newChild, oldChild) {
        for (const key of Object.getOwnPropertyNames(newChild)) {
            if (newChild[key] instanceof Container && key in oldChild) {
                newChild[key].addAll(oldChild[key].children);
            }
        }
        if (oldChild.isConnected) {
            this.element.replaceChild(newChild.element, oldChild.element);
        }
        else {
            console.error({
                parent: this.element,
                newChild: newChild.element,
                oldChild: oldChild.element
            });
            throw new TypeError();
        }
    }
    insertBefore(newChild, refChild) {
        if (newChild.element && refChild.element && this.element) {
            this.element.insertBefore(newChild.element, refChild.element);
        }
    }
    addAll(children) {
        // TODO this is periodically receiving an HTMLCollection (hence Array.from()), e.g. when the count for an Entry is changed by the user
        Array.from(children).forEach((child) => this.add(child));
    }
    remove(child) {
        child.element.remove();
    }
    isEmpty() {
        return this.children.length > 0;
    }
    clear() {
        this.element.innerHTML = '';
    }
}
exports.default = Container;
