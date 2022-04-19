(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@battis/jsx-factory"));
	else if(typeof define === 'function' && define.amd)
		define(["@battis/jsx-factory"], factory);
	else if(typeof exports === 'object')
		exports["BattisJsxComponents"] = factory(require("@battis/jsx-factory"));
	else
		root["BattisJsxComponents"] = factory(root["@battis/jsx-factory"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__battis_jsx_factory__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Container = exports.StatefulComponent = exports.Component = void 0;
const Component_1 = __importDefault(__webpack_require__(/*! ./src/Component */ "./src/Component.tsx"));
exports.Component = Component_1.default;
const Container_1 = __importDefault(__webpack_require__(/*! ./src/Container */ "./src/Container.tsx"));
exports.Container = Container_1.default;
const StatefulComponent_1 = __importDefault(__webpack_require__(/*! ./src/StatefulComponent */ "./src/StatefulComponent.tsx"));
exports.StatefulComponent = StatefulComponent_1.default;


/***/ }),

/***/ "./src/Comparable.ts":
/*!***************************!*\
  !*** ./src/Comparable.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.instanceOfComparable = void 0;
function instanceOfComparable(obj) {
    return (obj &&
        'equals' in obj &&
        typeof obj.equals === 'function' &&
        'compareTo' in obj &&
        typeof obj.compareTo === 'function');
}
exports.instanceOfComparable = instanceOfComparable;


/***/ }),

/***/ "./src/Component.tsx":
/*!***************************!*\
  !*** ./src/Component.tsx ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.instanceOfComponentizedElement = void 0;
const jsx_factory_1 = __importStar(__webpack_require__(/*! @battis/jsx-factory */ "@battis/jsx-factory"));
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
exports["default"] = Component;


/***/ }),

/***/ "./src/Container.tsx":
/*!***************************!*\
  !*** ./src/Container.tsx ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_factory_1 = __importDefault(__webpack_require__(/*! @battis/jsx-factory */ "@battis/jsx-factory"));
const Comparable_1 = __webpack_require__(/*! ./Comparable */ "./src/Comparable.ts");
const Component_1 = __importDefault(__webpack_require__(/*! ./Component */ "./src/Component.tsx"));
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
exports["default"] = Container;


/***/ }),

/***/ "./src/StatefulComponent.tsx":
/*!***********************************!*\
  !*** ./src/StatefulComponent.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const jsx_factory_1 = __importStar(__webpack_require__(/*! @battis/jsx-factory */ "@battis/jsx-factory"));
const Component_1 = __importDefault(__webpack_require__(/*! ./Component */ "./src/Component.tsx"));
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
exports["default"] = StatefulComponent;


/***/ }),

/***/ "@battis/jsx-factory":
/*!**************************************!*\
  !*** external "@battis/jsx-factory" ***!
  \**************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__battis_jsx_factory__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUN2SWY7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CYXR0aXNKc3hDb21wb25lbnRzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9CYXR0aXNKc3hDb21wb25lbnRzLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4Q29tcG9uZW50cy8uL3NyYy9Db21wYXJhYmxlLnRzIiwid2VicGFjazovL0JhdHRpc0pzeENvbXBvbmVudHMvLi9zcmMvQ29tcG9uZW50LnRzeCIsIndlYnBhY2s6Ly9CYXR0aXNKc3hDb21wb25lbnRzLy4vc3JjL0NvbnRhaW5lci50c3giLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4Q29tcG9uZW50cy8uL3NyYy9TdGF0ZWZ1bENvbXBvbmVudC50c3giLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4Q29tcG9uZW50cy9leHRlcm5hbCB1bWQgXCJAYmF0dGlzL2pzeC1mYWN0b3J5XCIiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4Q29tcG9uZW50cy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9CYXR0aXNKc3hDb21wb25lbnRzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4Q29tcG9uZW50cy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4Q29tcG9uZW50cy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiQGJhdHRpcy9qc3gtZmFjdG9yeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJAYmF0dGlzL2pzeC1mYWN0b3J5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIkJhdHRpc0pzeENvbXBvbmVudHNcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJAYmF0dGlzL2pzeC1mYWN0b3J5XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJCYXR0aXNKc3hDb21wb25lbnRzXCJdID0gZmFjdG9yeShyb290W1wiQGJhdHRpcy9qc3gtZmFjdG9yeVwiXSk7XG59KShzZWxmLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fYmF0dGlzX2pzeF9mYWN0b3J5X18pID0+IHtcbnJldHVybiAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ29udGFpbmVyID0gZXhwb3J0cy5TdGF0ZWZ1bENvbXBvbmVudCA9IGV4cG9ydHMuQ29tcG9uZW50ID0gdm9pZCAwO1xuY29uc3QgQ29tcG9uZW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc3JjL0NvbXBvbmVudFwiKSk7XG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudF8xLmRlZmF1bHQ7XG5jb25zdCBDb250YWluZXJfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9zcmMvQ29udGFpbmVyXCIpKTtcbmV4cG9ydHMuQ29udGFpbmVyID0gQ29udGFpbmVyXzEuZGVmYXVsdDtcbmNvbnN0IFN0YXRlZnVsQ29tcG9uZW50XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vc3JjL1N0YXRlZnVsQ29tcG9uZW50XCIpKTtcbmV4cG9ydHMuU3RhdGVmdWxDb21wb25lbnQgPSBTdGF0ZWZ1bENvbXBvbmVudF8xLmRlZmF1bHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5zdGFuY2VPZkNvbXBhcmFibGUgPSB2b2lkIDA7XG5mdW5jdGlvbiBpbnN0YW5jZU9mQ29tcGFyYWJsZShvYmopIHtcbiAgICByZXR1cm4gKG9iaiAmJlxuICAgICAgICAnZXF1YWxzJyBpbiBvYmogJiZcbiAgICAgICAgdHlwZW9mIG9iai5lcXVhbHMgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICAgJ2NvbXBhcmVUbycgaW4gb2JqICYmXG4gICAgICAgIHR5cGVvZiBvYmouY29tcGFyZVRvID09PSAnZnVuY3Rpb24nKTtcbn1cbmV4cG9ydHMuaW5zdGFuY2VPZkNvbXBhcmFibGUgPSBpbnN0YW5jZU9mQ29tcGFyYWJsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluc3RhbmNlT2ZDb21wb25lbnRpemVkRWxlbWVudCA9IHZvaWQgMDtcbmNvbnN0IGpzeF9mYWN0b3J5XzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBiYXR0aXMvanN4LWZhY3RvcnlcIikpO1xuZnVuY3Rpb24gaW5zdGFuY2VPZkNvbXBvbmVudGl6ZWRFbGVtZW50KG9iaikge1xuICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBFbGVtZW50ICYmICdjb21wb25lbnQnIGluIG9iajtcbn1cbmV4cG9ydHMuaW5zdGFuY2VPZkNvbXBvbmVudGl6ZWRFbGVtZW50ID0gaW5zdGFuY2VPZkNvbXBvbmVudGl6ZWRFbGVtZW50O1xuY2xhc3MgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBPYmplY3QuYXNzaWduKHt9LCBlbGVtZW50KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuZWxlbWVudEZyb21Tb3VyY2UoZWxlbWVudCkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBiaW5kVG8oZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50Wydjb21wb25lbnQnXSA9IHRoaXM7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudCB8fCB0aGlzLmJpbmRUbyh0aGlzLnJlbmRlcigpKTtcbiAgICB9XG4gICAgZ2V0IGVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsZW1lbnQoKTtcbiAgICB9XG4gICAgc2V0IGVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB0aGlzLnNldEVsZW1lbnQoZWxlbWVudCk7XG4gICAgfVxuICAgIGdldCBodG1sRWxlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhdXRpb246IHJlcGxhY2luZyBhbiBlbGVtZW50IHRoYXQgaXMgb2JzZXJ2ZWQgb3IgaGFzIGV2ZW50IGxpc3RlbmVycyB3aWxsIE5PVCB0cmFuc2ZlciB0aGF0IG9ic2VydmF0aW9uXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKi9cbiAgICBzZXRFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgX2VsZW1lbnQgPSB0aGlzLmJpbmRUbyhlbGVtZW50KTtcbiAgICAgICAgaWYgKChfYSA9IHRoaXMuX2VsZW1lbnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgKF9iID0gdGhpcy5fZWxlbWVudC5wYXJlbnRFbGVtZW50KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucmVwbGFjZUNoaWxkKF9lbGVtZW50LCB0aGlzLl9lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gX2VsZW1lbnQ7XG4gICAgfVxuICAgIGdldCBjaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2hpbGRyZW4oKTtcbiAgICB9XG4gICAgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gVE9ETyBjb252ZXJ0IHRvIGFuIGl0ZXJhYmxlIHR5cGU/XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLl9lbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2hpbGRyZW47XG4gICAgfVxuICAgIHJlbmRlcihjaGlsZHJlbikge1xuICAgICAgICBpZiAodGhpcy5fZWxlbWVudCAmJiBjaGlsZHJlbikge1xuICAgICAgICAgICAgKDAsIGpzeF9mYWN0b3J5XzEucmVuZGVyKSh0aGlzLl9lbGVtZW50LCBjaGlsZHJlbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5lbGVtZW50ID0ganN4X2ZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCwgY2hpbGRyZW4pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgZm9yKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGluc3RhbmNlT2ZDb21wb25lbnRpemVkRWxlbWVudChlbGVtZW50KSAmJlxuICAgICAgICAgICAgZWxlbWVudC5jb21wb25lbnQgaW5zdGFuY2VvZiB0aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jb21wb25lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcXVlcnlTZWxlY3RvcihzZWxlY3Rvciwgcm9vdCA9IGRvY3VtZW50KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSAocm9vdCBpbnN0YW5jZW9mIENvbXBvbmVudCA/IHJvb3QuZWxlbWVudCA6IHJvb3QpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5mb3IoZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgc3RhdGljIHF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IsIHJvb3QgPSBkb2N1bWVudCkge1xuICAgICAgICBjb25zdCBpbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgKHJvb3QgaW5zdGFuY2VvZiBDb21wb25lbnQgPyByb290LmVsZW1lbnQgOiByb290KVxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICAgICAgICAgICAuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZm9yKGVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKGNvbXBvbmVudCBpbnN0YW5jZW9mIHRoaXMpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZXMucHVzaChjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlcztcbiAgICB9XG4gICAgc3RhdGljIHBhcmVudChlbGVtZW50KSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gZWxlbWVudDtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5mb3IoY3VycmVudCk7XG4gICAgICAgICAgICBpZiAoY29tcG9uZW50IGluc3RhbmNlb2YgdGhpcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlIChjdXJyZW50KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGdldCBpc0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gISEoKF9hID0gdGhpcy5fZWxlbWVudCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlzQ29ubmVjdGVkKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBDb21wb25lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGpzeF9mYWN0b3J5XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIkBiYXR0aXMvanN4LWZhY3RvcnlcIikpO1xuY29uc3QgQ29tcGFyYWJsZV8xID0gcmVxdWlyZShcIi4vQ29tcGFyYWJsZVwiKTtcbmNvbnN0IENvbXBvbmVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL0NvbXBvbmVudFwiKSk7XG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnRfMS5kZWZhdWx0IHtcbiAgICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQuY2hpbGRyZW47XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgY29uc3QgW2VsZW1lbnQgPSBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsKSwgY2hpbGRyZW4gPSBbXV0gPSBhcmdzO1xuICAgICAgICBzdXBlcihlbGVtZW50KTtcbiAgICAgICAgdGhpcy5hZGRBbGwoY2hpbGRyZW4pO1xuICAgIH1cbiAgICBhZGQoY2hpbGQpIHtcbiAgICAgICAgaWYgKCgwLCBDb21wYXJhYmxlXzEuaW5zdGFuY2VPZkNvbXBhcmFibGUpKGNoaWxkKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaWJsaW5nID0gdGhpcy5lbGVtZW50LmNoaWxkcmVuLml0ZW0oaSk7XG4gICAgICAgICAgICAgICAgLy8gRklYTUUgdGhpcyBpcyBhbiB1bnNhZmUgYXNzdW1wdGlvbiAodGhhdCB0aGUgY29tcG9uZW50IHdpbGwgYWx3YXlzIGJlIGluc3RhbmNlIG9mIFQpXG4gICAgICAgICAgICAgICAgY29uc3Qgc2libGluZ0NvbXBvbmVudCA9IHNpYmxpbmcgJiYgQ29tcG9uZW50XzEuZGVmYXVsdC5mb3Ioc2libGluZyk7XG4gICAgICAgICAgICAgICAgaWYgKHNpYmxpbmdDb21wb25lbnQgJiZcbiAgICAgICAgICAgICAgICAgICAgKDAsIENvbXBhcmFibGVfMS5pbnN0YW5jZU9mQ29tcGFyYWJsZSkoc2libGluZ0NvbXBvbmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpYmxpbmdDb21wb25lbnQuZXF1YWxzKGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZUNoaWxkKGNoaWxkLCBzaWJsaW5nQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzaWJsaW5nQ29tcG9uZW50LmNvbXBhcmVUbyhjaGlsZCkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5zZXJ0QmVmb3JlKGNoaWxkLCBzaWJsaW5nQ29tcG9uZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgICBhcHBlbmRDaGlsZChjaGlsZCkge1xuICAgICAgICBpZiAoY2hpbGQuZWxlbWVudCAmJiB0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZC5lbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXBsYWNlQ2hpbGQobmV3Q2hpbGQsIG9sZENoaWxkKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG5ld0NoaWxkKSkge1xuICAgICAgICAgICAgaWYgKG5ld0NoaWxkW2tleV0gaW5zdGFuY2VvZiBDb250YWluZXIgJiYga2V5IGluIG9sZENoaWxkKSB7XG4gICAgICAgICAgICAgICAgbmV3Q2hpbGRba2V5XS5hZGRBbGwob2xkQ2hpbGRba2V5XS5jaGlsZHJlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9sZENoaWxkLmlzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVwbGFjZUNoaWxkKG5ld0NoaWxkLmVsZW1lbnQsIG9sZENoaWxkLmVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcih7XG4gICAgICAgICAgICAgICAgcGFyZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgICAgICAgbmV3Q2hpbGQ6IG5ld0NoaWxkLmVsZW1lbnQsXG4gICAgICAgICAgICAgICAgb2xkQ2hpbGQ6IG9sZENoaWxkLmVsZW1lbnRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluc2VydEJlZm9yZShuZXdDaGlsZCwgcmVmQ2hpbGQpIHtcbiAgICAgICAgaWYgKG5ld0NoaWxkLmVsZW1lbnQgJiYgcmVmQ2hpbGQuZWxlbWVudCAmJiB0aGlzLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5pbnNlcnRCZWZvcmUobmV3Q2hpbGQuZWxlbWVudCwgcmVmQ2hpbGQuZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYWRkQWxsKGNoaWxkcmVuKSB7XG4gICAgICAgIC8vIFRPRE8gdGhpcyBpcyBwZXJpb2RpY2FsbHkgcmVjZWl2aW5nIGFuIEhUTUxDb2xsZWN0aW9uIChoZW5jZSBBcnJheS5mcm9tKCkpLCBlLmcuIHdoZW4gdGhlIGNvdW50IGZvciBhbiBFbnRyeSBpcyBjaGFuZ2VkIGJ5IHRoZSB1c2VyXG4gICAgICAgIEFycmF5LmZyb20oY2hpbGRyZW4pLmZvckVhY2goKGNoaWxkKSA9PiB0aGlzLmFkZChjaGlsZCkpO1xuICAgIH1cbiAgICByZW1vdmUoY2hpbGQpIHtcbiAgICAgICAgY2hpbGQuZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMDtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBDb250YWluZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX3NldE1vZHVsZURlZmF1bHQpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XG59KTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QganN4X2ZhY3RvcnlfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGJhdHRpcy9qc3gtZmFjdG9yeVwiKSk7XG5jb25zdCBDb21wb25lbnRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9Db21wb25lbnRcIikpO1xuY2xhc3MgU3RhdGVmdWxDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnRfMS5kZWZhdWx0IHtcbiAgICAvLyBGSVhNRSB0aGVyZSBpcyBzZXJpb3VzIHBvdGVudGlhbCBmb3IgY29uZnVzaW9uIGJldHdlZW4gYSBzaW5nbGUgb2JqZWN0IGFyZ3VtZW50IHRoYXQgY291bGQgYmUgZWl0aGVyIGFuIGluaXRpYWwgc3RhdGUgb3IgcHJvcGVydGllc1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBkYXRhID0ge307XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGFyZ3NbMF0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCB8fCB0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBbZWxlbWVudCwgZGF0YSA9IHt9XSA9IGFyZ3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBbZGF0YV0gPSBhcmdzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgICAgICB0aGlzLnN0YXRlID0gbmV3IFByb3h5KGRhdGEsIHtcbiAgICAgICAgICAgIHNldDogKHN0YXRlLCBrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgc3RhdGVba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZShrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBzdXBlci5zZXRFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9uU3RhdGVDaGFuZ2Uoa2V5LCB0aGlzLnN0YXRlW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldENoaWxkcmVuKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNoaWxkcmVuJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jaGlsZHJlbjtcbiAgICB9XG4gICAgcmVuZGVyKGNoaWxkcmVuKSB7XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudCA9IGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLnN0YXRlKS5maWx0ZXIoKHByb3ApID0+IHRoaXMuaXNSZW5kZXJhYmxlUHJvcGVydHkocHJvcCkpO1xuICAgICAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgICAgICAgKDAsIGpzeF9mYWN0b3J5XzEucmVuZGVyKSh0aGlzLl9lbGVtZW50LCBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRnJhZ21lbnQsIG51bGwsXG4gICAgICAgICAgICAgICAganN4X2ZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzczogXCJ0eXBlXCIgfSwgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lKSxcbiAgICAgICAgICAgICAgICBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcInN0YXRlXCIgfSwga2V5cy5tYXAoKGtleSkgPT4gKGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGpzeF9mYWN0b3J5XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwic3BhblwiLCB7IGNsYXNzOiBcImxhYmVsXCIgfSwga2V5KSxcbiAgICAgICAgICAgICAgICAgICAganN4X2ZhY3RvcnlfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIHsgY2xhc3M6IGtleSB9LCB0aGlzLnJlbmRlclByb3BlcnR5KGtleSkpKSkpKSxcbiAgICAgICAgICAgICAgICBqc3hfZmFjdG9yeV8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzOiBcImNoaWxkcmVuXCIgfSwgY2hpbGRyZW4pKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gICAgfVxuICAgIG9uU3RhdGVDaGFuZ2Uoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLmlzUmVuZGVyYWJsZVByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gKF9hID0gdGhpcy5lbGVtZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucXVlcnlTZWxlY3RvckFsbChgLiR7a2V5LnRvU3RyaW5nKCl9YCk7XG4gICAgICAgICAgICBsZXQgcmVuZGVyU3RyYXRlZ3k7XG4gICAgICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBDb21wb25lbnRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyU3RyYXRlZ3kgPSAoZWxlbWVudCkgPT4gKDAsIGpzeF9mYWN0b3J5XzEucmVuZGVyKShlbGVtZW50LCB2YWx1ZS5lbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRWYWx1ZSA9IHRoaXMucmVuZGVyVmFsdWUodmFsdWUsIGtleSk7XG4gICAgICAgICAgICAgICAgcmVuZGVyU3RyYXRlZ3kgPSAoZWxlbWVudCkgPT4gKGVsZW1lbnQuaW5uZXJIVE1MID0gZWxlbWVudFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBlbGVtZW50cyAmJiBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoU3RhdGVmdWxDb21wb25lbnQucGFyZW50KGVsZW1lbnRzW2ldKSA9PT0gdGhpcykge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJTdHJhdGVneShlbGVtZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFRlc3QgaWYgYSBwcm9wZXJ0eSBzaG91bGQgYmUgcmVuZGVyZWQgd2l0aGluIGEgRGF0YUNvbXBvbmVudC4gQnkgZGVmYXVsdCBFUzYgcHJpdmF0ZSBwcm9wZXJ0aWVzIChuYW1lZCBzdGFydGluZyB3aXRoIF8pIGFyZSBub3QgcmVuZGVyZWQuXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBleGNsdWRlXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGlzUmVuZGVyYWJsZVByb3BlcnR5KGtleSwgZXhjbHVkZSA9IFtdKSB7XG4gICAgICAgIHJldHVybiAoa2V5LmNoYXJBdCgwKSAhPT0gJ18nICYmXG4gICAgICAgICAgICBrZXkuc3Vic3RyKC0zKSAhPT0gJ19pZCcgJiZcbiAgICAgICAgICAgICFleGNsdWRlLmluY2x1ZGVzKGtleSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW5kZXIgYSBwYXJ0aWN1bGFyIHByb3BlcnR5IG9mIGEgRGF0YUNvbXBvbmVudC4gQlkgZGVmYXVsdCBpZiB0aGUgcHJvcGVydHkgaXMgaXRzZWxmIGEgRGF0YUNvbXBvbmVudCwgaXQgaXMgcmVuZGVyZWQsIG90aGVyd2lzZSBpdCBpcyBkaXNwbGF5ZWQgXCJhcyBpcy5cIlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmVuZGVyUHJvcGVydHkoa2V5KSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdGF0ZVtrZXldO1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBDb21wb25lbnRfMS5kZWZhdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJWYWx1ZSh2YWx1ZSwga2V5KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVuZGVyIHRoZSB2YWx1ZSBvZiBhIHByb3BlcnR5LiBBbGwgdmFsdWVzIGFyZSBjb252ZXJ0ZWQgdG8gc3RyaW5ncywgYXJyYXlzIGFyZSByZWN1cnNpdmVseSBjb252ZXJ0ZWQgdG8gc3RyaW5ncy5cbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHJlbmRlclZhbHVlKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTdGF0ZWZ1bENvbXBvbmVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fYmF0dGlzX2pzeF9mYWN0b3J5X187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=