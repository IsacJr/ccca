import { Shipping } from "../domain/entity/shipping";
import { ItemRepository } from "../domain/repository/ItemRepository";

export default class SimulateShipping {

	constructor (readonly itemRepository: ItemRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const freight = new Shipping();
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.get(orderItem.idItem);
			freight.addItem(item, orderItem.quantity);
		}
		return {
			total: freight.totalValue()
		}
	}
}

type Input = {
	orderItems: { idItem: number, quantity: number }[]
}

type Output = {
	total: number
}