"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOfComponentizedElement = void 0;
const jsx_factory_1 = __importStar(require("@battis/jsx-factory"));
function instanceOfComponentizedElement(obj) {
    return obj instanceof Element && 'component' in obj;
}
exports.instanceOfComponentizedElement = instanceOfComponentizedElement;
class Component {
    constructor(element) {
        this._element = null;
        if (element) {
            if (element instanceof HTMLElement) {
                this.element = element;
            }
            else if (typeof element === 'object') {
                this.element = jsx_factory_1.default.createElement("div", Object.assign({}, element));
            }
            else {
                this.element = jsx_factory_1.default.elementFromSource(element)();
            }
        }
    }
    bindTo(element) {
        element['component'] = this;
        return element;
    }
    getElement() {
        return this._element || this.bindTo(this.render());
    }
    get element() {
        return this.getElement();
    }
    set element(element) {
        this.setElement(element);
    }
    get htmlElement() {
        if (this.element instanceof HTMLElement) {
            return this.element;
        }
        return undefined;
    }
    /**
     * Caution: replacing an element that is observed or has event listeners will NOT transfer that observation
     * @param element
     */
    setElement(element) {
        var _a, _b;
        const _element = this.bindTo(element);
        if ((_a = this._element) === null || _a === void 0 ? void 0 : _a.isConnected) {
            (_b = this._element.parentElement) === null || _b === void 0 ? void 0 : _b.replaceChild(_element, this._element);
        }
        this._element = _element;
    }
    get children() {
        return this.getChildren();
    }
    getChildren() {
        var _a;
        // TODO convert to an iterable type?
        return (_a = this._element) === null || _a === void 0 ? void 0 : _a.children;
    }
    render(children) {
        if (this._element && children) {
            (0, jsx_factory_1.render)(this._element, children);
            return this._element;
        }
        else {
            return (this.element = jsx_factory_1.default.createElement("div", null, children));
        }
    }
    static for(element) {
        if (instanceOfComponentizedElement(element) &&
            element.component instanceof this) {
            return element.component;
        }
        else {
            return null;
        }
    }
    static querySelector(selector, root = document) {
        const element = (root instanceof Component ? root.element : root).querySelector(selector);
        if (element) {
            const component = this.for(element);
            if (component) {
                return component;
            }
        }
        return null;
    }
    static querySelectorAll(selector, root = document) {
        const instances = [];
        (root instanceof Component ? root.element : root)
            .querySelectorAll(selector)
            .forEach(element => {
            const component = this.for(element);
            if (component instanceof this) {
                instances.push(component);
            }
        });
        return instances;
    }
    static parent(element) {
        let current = element;
        do {
            const component = this.for(current);
            if (component instanceof this) {
                return component;
            }
            else {
                current = current.parentElement;
            }
        } while (current);
        return null;
    }
    get isConnected() {
        var _a;
        return !!((_a = this._element) === null || _a === void 0 ? void 0 : _a.isConnected);
    }
}
exports.default = Component;
