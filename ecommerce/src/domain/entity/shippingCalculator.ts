import { Item } from "./item";

export default class ShippingCalculator {
	private DISTANCE = 1000;
	private FACTOR = 100;

	calculate (item: Item, quantity: number) {
		const freight = item.getVolume() * this.DISTANCE * (item.getDensity()/this.FACTOR);
		return freight * quantity;
	}
}