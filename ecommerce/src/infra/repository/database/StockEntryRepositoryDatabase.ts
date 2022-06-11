import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import { IConnection } from "../../database/IConnection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {

	constructor (readonly connection: IConnection) {
	}

	async save(stockEntry: StockEntry): Promise<void> {
		await this.connection.query("insert into ccca.stock_entry (id_item, operation, quantity) values ($1, $2, $3)", [stockEntry.idItem, stockEntry.operation, stockEntry.quantity]);
	}

	async getStockEntries(idItem: number): Promise<StockEntry[]> {
		const stockEntriesData = await this.connection.query("select * from ccca.stock_entry where id_item = $1", [idItem]);
		const stockEntries = [];
		for (const stockEntryData of stockEntriesData) {
			const stockEntry = new StockEntry(stockEntryData.id_item, stockEntryData.operation, stockEntryData.quantity);
			stockEntries.push(stockEntry);
		}
		return stockEntries;
	}

	async clear(): Promise<void> {
		await this.connection.query("delete from ccca.stock_entry", []);
	}
}