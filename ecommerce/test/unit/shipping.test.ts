import { Dimension } from "../../src/domain/entity/dimension";
import { Item } from "../../src/domain/entity/item";
import { Shipping } from "../../src/domain/entity/shipping";

test("create a valid shipping", function () {
    const freight = new Shipping();
	freight.addItem(new Item(1, "Guitarra", 1000, new Dimension(1, 0.30, 0.10), 3), 1, 1000);
	freight.addItem(new Item(2, "Amplificador", 5000, new Dimension(0.50, 0.50, 0.50), 20), 1, 1000);
	freight.addItem(new Item(3, "Cabo", 30, new Dimension(0.10, 0.10, 0.10), 1), 3, 1000);

	const total = freight.totalValue();

	expect(total).toBe(260);
});

test("create a minimal shipping value", function () {
    const freight = new Shipping();
	freight.addItem(new Item(3, "Cabo", 30, new Dimension(0.10, 0.10, 0.10), 1), 1, 1000);

	const total = freight.totalValue();

	expect(total).toBe(10);
});