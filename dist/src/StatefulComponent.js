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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_factory_1 = __importStar(require("@battis/jsx-factory"));
const Component_1 = __importDefault(require("./Component"));
class StatefulComponent extends Component_1.default {
    // FIXME there is serious potential for confusion between a single object argument that could be either an initial state or properties
    constructor(...args) {
        let element = undefined;
        let data = {};
        if (args.length) {
            if (args[0] instanceof HTMLElement || typeof args[0] === 'string') {
                [element, data = {}] = args;
            }
            else {
                [data] = args;
            }
        }
        super(element);
        this.state = new Proxy(data, {
            set: (state, key, value) => {
                state[key] = value;
                this.onStateChange(key, value);
                return true;
            }
        });
    }
    setElement(element) {
        super.setElement(element);
        for (const key in this.state) {
            this.onStateChange(key, this.state[key]);
        }
    }
    getChildren() {
        var _a;
        return (_a = this.element.querySelector('.children')) === null || _a === void 0 ? void 0 : _a.children;
    }
    render(children) {
        if (!this._element) {
            this._element = jsx_factory_1.default.createElement("div", null);
        }
        const keys = Object.getOwnPropertyNames(this.state).filter((prop) => this.isRenderableProperty(prop));
        if (this._element) {
            (0, jsx_factory_1.render)(this._element, jsx_factory_1.default.createElement(jsx_factory_1.default.createFragment, null,
                jsx_factory_1.default.createElement("div", { class: "type" }, this.constructor.name),
                jsx_factory_1.default.createElement("div", { class: "state" }, keys.map((key) => (jsx_factory_1.default.createElement("div", null,
                    jsx_factory_1.default.createElement("span", { class: "label" }, key),
                    jsx_factory_1.default.createElement("span", { class: key }, this.renderProperty(key)))))),
                jsx_factory_1.default.createElement("div", { class: "children" }, children)));
        }
        return this._element;
    }
    onStateChange(key, value) {
        var _a;
        if (this.isRenderableProperty(key)) {
            const elements = (_a = this.element) === null || _a === void 0 ? void 0 : _a.querySelectorAll(`.${key.toString()}`);
            let renderStrategy;
            if (value instanceof Component_1.default) {
                renderStrategy = (element) => (0, jsx_factory_1.render)(element, value.element);
            }
            else {
                const elementValue = this.renderValue(value, key);
                renderStrategy = (element) => (element.innerHTML = elementValue);
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
    isRenderableProperty(key, exclude = []) {
        return (key.charAt(0) !== '_' &&
            key.substr(-3) !== '_id' &&
            !exclude.includes(key));
    }
    /**
     * Render a particular property of a DataComponent. BY default if the property is itself a DataComponent, it is rendered, otherwise it is displayed "as is."
     * @param key
     * @protected
     */
    renderProperty(key) {
        const value = this.state[key];
        if (value instanceof Component_1.default) {
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
    renderValue(value, key) {
        if (typeof value === 'function') {
            return value.toString();
        }
        else if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    }
}
exports.default = StatefulComponent;
