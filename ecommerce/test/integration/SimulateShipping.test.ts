import SimulateShipping from "../../src/application/SimulateShipping";
import { Dimension } from "../../src/domain/entity/dimension";
import { Item } from "../../src/domain/entity/item";
import { ItemRepositoryMemory } from "../../src/infra/repository/memory/ItemRepositoryMemory";

test("It should simulate the order shipping", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3));
	itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20));
	itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
	const simulateFreight = new SimulateShipping(itemRepository);
	const input = {
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		]
	}
	const output = await simulateFreight.execute(input);
	expect(output.total).toBe(260);
});