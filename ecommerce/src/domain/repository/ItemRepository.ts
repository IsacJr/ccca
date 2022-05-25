import { Item } from "../entity/item";

export interface ItemRepository {
	get(idItem: number): Promise<Item>;
	save(item: Item): Promise<void>;
	list(): Promise<Item[]>;
}