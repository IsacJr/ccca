import { GetOrders } from "../../src/application/GetOrders";
import { PlaceOrder } from "../../src/application/PlaceOrder";
import { Dimension } from "../../src/domain/entity/dimension";
import { Item } from "../../src/domain/entity/item";
import { OrderRepository } from "../../src/domain/repository/OrderRepository";
import { IConnection } from "../../src/infra/database/IConnection";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../../src/infra/repository/memory/ItemRepositoryMemory";

let connection: IConnection;
let orderRepository: OrderRepository;

beforeEach(async function () {
    connection = new PgPromiseConnectionAdapter();
    orderRepository = new OrderRepositoryDatabase(connection);
    await orderRepository.clear();
});

test("It should get an empty order list", async function() {
    const getOrders = new GetOrders(orderRepository);
    const output = await getOrders.execute();
    expect(output).toHaveLength(0);
});

test("It should get the saed orders", async function() {
    const itemRepository = new ItemRepositoryMemory();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3));
	itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20));
	itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
	const couponRepository = new CouponRepositoryMemory();
	const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
	const input = {
		cpf: "935.411.347-80",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
        date: new Date("2021-03-01T10:00:00")
	};
	await placeOrder.execute(input);
    
    const getOrders = new GetOrders(orderRepository);
    const output = await getOrders.execute();
    expect(output).toHaveLength(1);
    const [order] = output;
    expect(order.code).toBe("202100000001");
    expect(order.total).toBe(6350);
});

afterEach(async function () {
   await connection.close(); 
});