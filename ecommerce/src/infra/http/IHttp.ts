export interface IHttp {
    on (method: string, url: string, callback: Function): void;
    listen (port: number): void;
}