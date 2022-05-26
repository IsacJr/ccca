import { Order } from "../domain/entity/order";
import { RepositoryFactory } from "../domain/factory/RepositoryFactory";
import { CouponRepository } from "../domain/repository/CouponRepository";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { OrderRepository } from "../domain/repository/OrderRepository";

export class PlaceOrder {
	readonly itemRepository: ItemRepository;
	readonly orderRepository: OrderRepository;
	readonly couponRepository: CouponRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.itemRepository = repositoryFactory.createItemRepository();
		this.orderRepository = repositoryFactory.createOrderRepository();
		this.couponRepository = repositoryFactory.createCouponRepository();
	}

	async execute (input: Input): Promise<Output> {
		const sequence = await this.orderRepository.count() + 1;
		const order = new Order(input.cpf, input.date, sequence);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.get(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
		}
		if (input.coupon) {
			const coupon = await this.couponRepository.get(input.coupon);
			order.addCoupon(coupon);
		}
		await this.orderRepository.save(order);
		const total = order.calculateTotal();
		return {
			code: order.code.value,
			total
		}
	}
}

type Input = {
	cpf: string,
	orderItems: { idItem: number, quantity: number}[],
	coupon?: string,
	date?: Date
}

type Output = {
	code: string,
	total: number
}