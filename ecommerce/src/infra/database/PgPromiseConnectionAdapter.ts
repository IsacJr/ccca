import { IConnection } from "./IConnection";
import pgp from 'pg-promise';

export class PgPromiseConnectionAdapter implements IConnection {
    pgp: any;

    constructor () {
        this.pgp = pgp()("postgresql://postgres:your_password_here@localhost:5432/app");
    }

    query(statement: string, params: any): Promise<any> {
        return this.pgp.query(statement, params);
    }

    close(): Promise<void> {
		return this.pgp.$pool.end();
	}
}