import { ILedsApi, ICurrentScene } from "../../../shared/api/leds-api";

export class ApiClient implements ProxyHandler<ILedsApi> {

  private readonly ledsApiProxy: ILedsApi;


  constructor() {
    this.ledsApiProxy = new Proxy({} as ILedsApi, this);
  }

  public ledsApi = (): ILedsApi => this.ledsApiProxy;

  get(target: ILedsApi, p: PropertyKey): any {
    console.log("get", target, p);
    const r: ICurrentScene = {
      name: "xys"
    };
    return () => r;
  }

  getPrototypeOf(target: ILedsApi): (object | null) {
    console.log("getPrototypeOf");
    return null;
  }
  setPrototypeOf(target: ILedsApi, v: any): boolean {
    console.log("setPrototypeOf");
    return false;
  }
  isExtensible(target: ILedsApi): boolean {
    console.log("isExtensible");
    return false;

  }
  preventExtensions(target: ILedsApi): boolean {
    console.log("preventExtensions");
    return false;

  }
  getOwnPropertyDescriptor(target: ILedsApi, p: PropertyKey): PropertyDescriptor | undefined {
    console.log("getOwnPropertyDescriptor");
    return undefined;
  }
  has(target: ILedsApi, p: PropertyKey): boolean {
    console.log("has");
    return false;

  }
  set(target: ILedsApi, p: PropertyKey, value: any, receiver: any): boolean {
    console.log("set");
    return false;

  }
  deleteProperty(target: ILedsApi, p: PropertyKey): boolean {
    console.log("deleteProperty");
    return false;

  }
  defineProperty(target: ILedsApi, p: PropertyKey, attributes: PropertyDescriptor): boolean {
    console.log("defineProperty");
    return false;

  }
  enumerate(target: ILedsApi): PropertyKey[] {
    console.log("enumerate");
    return [];
  }
  ownKeys(target: ILedsApi): PropertyKey[] {
    console.log("ownKeys");
    return [];

  }
  apply(target: ILedsApi, thisArg: any, argArray?: any): any {
    console.log("apply");
    return null;
  }
  construct(target: ILedsApi, argArray: any, newTarget?: any): object {
    console.log("construct");
    return {};
  }


}