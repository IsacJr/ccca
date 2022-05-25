import { Order } from "../../../domain/entity/order";
import { OrderRepository } from "../../../domain/repository/OrderRepository";

export class OrderRepositoryMemory implements OrderRepository {
	orders: Order[];

	constructor () {
		this.orders = [];
	}

	async save(order: Order): Promise<void> {
		this.orders.push(order);
	}

	async count(): Promise<number> {
		return this.orders.length;
	}

	async list(): Promise<Order[]> {
		return this.orders;
	}

	async get(code: string): Promise<Order> {
		const order = this.orders.find(o => o.code.value === code);
		if(!order) throw Error('Order not found');
		return order;
	}

	async clear(): Promise<void> {
		this.orders = [];
	}
}