"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const jsx_api_1 = require("@battis/jsx-api");
const StatefulComponent_1 = __importDefault(require("./StatefulComponent"));
class ServerComponent extends StatefulComponent_1.default {
    constructor(...args) {
        super(...args);
    }
    get id() {
        return this.state.id;
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield jsx_api_1.API.post({
                endpoint: this.serverPath,
                body: data,
            });
            if (result) {
                return new this(result);
            }
            return null;
        });
    }
    static get(id, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            // try to find component in DOM first
            if (selector) {
                const elements = document.body.querySelectorAll(selector);
                for (let i = 0; i < elements.length; i++) {
                    const component = this.for(elements[i]);
                    if ((component === null || component === void 0 ? void 0 : component.id) === id) {
                        return component;
                    }
                }
            }
            // ...then request from server
            const data = yield jsx_api_1.API.get({
                endpoint: path_1.default.join(this.serverPath, id),
            });
            let component;
            if (data) {
                component = new this(data);
            }
            return component || null;
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield jsx_api_1.API.get({
                endpoint: this.serverPath,
            });
            return data.map((datum) => new this(datum));
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const key of Object.getOwnPropertyNames(this.state)) {
                if (key in data && data[key] === this.state[key]) {
                    delete data[key];
                }
            }
            if (Object.getOwnPropertyNames(data).length) {
                const result = yield jsx_api_1.API.put({
                    endpoint: path_1.default.join(this.constructor.serverPath, this.id),
                    body: data,
                });
                this.updateState(result);
            }
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            yield jsx_api_1.API.delete({
                endpoint: path_1.default.join(this.constructor.serverPath, this.id),
            });
            this.element.remove();
        });
    }
    editCallback(edits) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update(edits);
        });
    }
    editableProperties() {
        const props = {};
        Object.getOwnPropertyNames(this.state)
            .filter((key) => key !== "id")
            .forEach((key) => (props[key] = this.state[key]));
        return props;
    }
    updateState(data) {
        for (const prop of Object.getOwnPropertyNames(data)) {
            this.state[prop] = data[prop];
        }
    }
}
exports.default = ServerComponent;
