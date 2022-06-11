import { Order } from "../domain/entity/order";
import ShippingCalculator from "../domain/entity/shippingCalculator";
import OrderPlaced from "../domain/event/OrderPlaced";
import { RepositoryFactory } from "../domain/factory/RepositoryFactory";
import { CouponRepository } from "../domain/repository/CouponRepository";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { OrderRepository } from "../domain/repository/OrderRepository";
import StockEntryRepository from "../domain/repository/StockEntryRepository";
import Queue from "../infra/event/Queue";

export class PlaceOrder {
	readonly itemRepository: ItemRepository;
	readonly orderRepository: OrderRepository;
	readonly couponRepository: CouponRepository;
	readonly stockEntryRepository: StockEntryRepository;

	constructor (readonly repositoryFactory: RepositoryFactory, readonly queue: Queue) {
		this.itemRepository = repositoryFactory.createItemRepository();
		this.orderRepository = repositoryFactory.createOrderRepository();
		this.couponRepository = repositoryFactory.createCouponRepository();
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
	}

	async execute (input: Input): Promise<Output> {
		const sequence = await this.orderRepository.count() + 1;
		const order = new Order(input.cpf, input.date, sequence);
		let shipping = 0;
		const shippingCalculator = new ShippingCalculator();
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.get(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
			shipping += shippingCalculator.calculate(item, orderItem.quantity);
		}
		if (input.coupon) {
			const coupon = await this.couponRepository.get(input.coupon);
			order.addCoupon(coupon);
		}
		await this.orderRepository.save(order);

		const orderPlaced = new OrderPlaced(order.code.value, order.orderItems);
		await this.queue.publish(orderPlaced);
		
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