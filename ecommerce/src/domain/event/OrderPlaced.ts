import { OrderItem } from "../entity/orderItem";
import DomainEvent from "./DomainEvent";

export default class OrderPlaced implements DomainEvent {
	name = "orderPlaced";

	constructor (readonly code: string, readonly orderItems: OrderItem[]) {
	}
}