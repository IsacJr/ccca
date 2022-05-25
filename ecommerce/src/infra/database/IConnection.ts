export interface IConnection {
    query (statement: string, params: any): Promise<any>;
    close (): Promise<void>;
}