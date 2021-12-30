import { Nullable } from "@battis/typescript-tricks";
import path from "path";
import { API } from "@battis/jsx-api";
import StatefulComponent from "./StatefulComponent";
import Component from "./Component";

export type ServerComponentCreateConfig<T extends typeof ServerComponent> = {
  skeleton?: object;
  callback?: (result: Nullable<InstanceType<T>>) => any;
  component?: Component;
};

export default class ServerComponent extends StatefulComponent {
  public static serverPath: string;

  public constructor(...args) {
    super(...args);
  }

  public get id(): string {
    return this.state.id;
  }

  public static async create<T extends typeof ServerComponent>(
    data: object
  ): Promise<Nullable<InstanceType<T>>> {
    const result = await API.post({
      endpoint: this.serverPath,
      body: data,
    });
    if (result) {
      return new this(result) as InstanceType<T>;
    }
    return null;
  }

  public static async get<T extends typeof ServerComponent>(
    this: T,
    id: string,
    selector?: string
  ): Promise<Nullable<InstanceType<T>>> {
    // try to find component in DOM first
    if (selector) {
      const elements = document.body.querySelectorAll(selector);
      for (let i = 0; i < elements.length; i++) {
        const component = this.for(elements[i]);
        if (component?.id === id) {
          return component;
        }
      }
    }

    // ...then request from server
    const data = await API.get({
      endpoint: path.join(this.serverPath, id),
    });
    let component;
    if (data) {
      component = new this(data);
    }
    return component || null;
  }

  public static async list<T extends typeof ServerComponent>(
    this: T
  ): Promise<InstanceType<T>[]> {
    const data = await API.get({
      endpoint: this.serverPath,
    });
    return data.map((datum) => new this(datum));
  }

  public async update(data: object): Promise<void> {
    for (const key of Object.getOwnPropertyNames(this.state)) {
      if (key in data && data[key] === this.state[key]) {
        delete data[key];
      }
    }
    if (Object.getOwnPropertyNames(data).length) {
      const result = await API.put({
        endpoint: path.join(
          (this.constructor as typeof ServerComponent).serverPath,
          this.id
        ),
        body: data,
      });
      this.updateState(result);
    }
  }

  public async delete(): Promise<void> {
    await API.delete({
      endpoint: path.join(
        (this.constructor as typeof ServerComponent).serverPath,
        this.id
      ),
    });
    this.element.remove();
  }

  public async editCallback(edits): Promise<void> {
    await this.update(edits);
  }

  public editableProperties(): object {
    const props = {};
    Object.getOwnPropertyNames(this.state)
      .filter((key) => key !== "id")
      .forEach((key) => (props[key] = this.state[key]));
    return props;
  }

  protected updateState(data): void {
    for (const prop of Object.getOwnPropertyNames(data)) {
      this.state[prop] = data[prop];
    }
  }
}
