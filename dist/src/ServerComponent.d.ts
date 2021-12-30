import { Nullable } from "@battis/typescript-tricks";
import StatefulComponent from "./StatefulComponent";
import Component from "./Component";
export declare type ServerComponentCreateConfig<T extends typeof ServerComponent> = {
    skeleton?: object;
    callback?: (result: Nullable<InstanceType<T>>) => any;
    component?: Component;
};
export default class ServerComponent extends StatefulComponent {
    static serverPath: string;
    constructor(...args: any[]);
    get id(): string;
    static create<T extends typeof ServerComponent>(data: object): Promise<Nullable<InstanceType<T>>>;
    static get<T extends typeof ServerComponent>(this: T, id: string, selector?: string): Promise<Nullable<InstanceType<T>>>;
    static list<T extends typeof ServerComponent>(this: T): Promise<InstanceType<T>[]>;
    update(data: object): Promise<void>;
    delete(): Promise<void>;
    editCallback(edits: any): Promise<void>;
    editableProperties(): object;
    protected updateState(data: any): void;
}
