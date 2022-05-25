import express from "express";
import { IHttp } from "./IHttp";

export class ExpressAdapter implements IHttp {
    app: any;

    constructor() {
        this.app = express();
    }
    
    on(method: string, url: string, callback: Function): void {
        this.app[method](url, async function (req: any, res: any) {
            const output = await callback(req.params, req.body);
            res.json(output);
        });
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}