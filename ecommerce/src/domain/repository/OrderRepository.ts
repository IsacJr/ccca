import { Order } from "../entity/order";

export interface OrderRepository {
	save(order: Order): Promise<void>;
	count(): Promise<number>;
	list(): Promise<Order[]>;
	get(code: string): Promise<Order>;
	clear(): Promise<void>;
}