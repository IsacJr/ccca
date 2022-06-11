import { GetOrders } from "../../src/application/GetOrders";
import { PlaceOrder } from "../../src/application/PlaceOrder";
import GetOrdersQuery from "../../src/application/query/GetOrdersQuery";
import { Coupon } from "../../src/domain/entity/coupon";
import { Dimension } from "../../src/domain/entity/dimension";
import { Item } from "../../src/domain/entity/item";
import { RepositoryFactory } from "../../src/domain/factory/RepositoryFactory";
import { OrderRepository } from "../../src/domain/repository/OrderRepository";
import { IConnection } from "../../src/infra/database/IConnection";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import MemoryQueueAdapter from "../../src/infra/event/MemoryQueueAdapter";
import Queue from "../../src/infra/event/Queue";
import RabbitMQAdapter from "../../src/infra/event/RabbitMQAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../../src/infra/repository/memory/ItemRepositoryMemory";

let connection: IConnection;
let orderRepository: OrderRepository;
let repositoryFactory: RepositoryFactory;
let queue: Queue;

beforeEach(async function () {
    connection = new PgPromiseConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    orderRepository = new OrderRepositoryDatabase(connection);
    await orderRepository.clear();
	queue = new MemoryQueueAdapter();
	// queue = new RabbitMQAdapter();
});

test("It should get an empty order list", async function() {
    const getOrders = new GetOrders(repositoryFactory);
    const output = await getOrders.execute();
    expect(output).toHaveLength(0);
});


test("It should get the saved orders", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3));
	itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20));
	itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
	const couponRepository = new CouponRepositoryMemory();
	couponRepository.save(new Coupon("VALE20", 20, new Date("2021-03-10T10:00:00")));
	const placeOrder = new PlaceOrder(repositoryFactory, queue);
	const input = {
		cpf: "935.411.347-80",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
		coupon: "VALE20",
		date: new Date("2021-03-01T10:00:00")
	};
	await placeOrder.execute(input);
	await placeOrder.execute(input);
	
    // method 1: It uses the repository approach - more structured, but less scalable
    // writting model and reading model are the same
    const getOrders = new GetOrders(repositoryFactory);
	const output = await getOrders.execute();
	expect(output).toHaveLength(2);
	
    const [order1, order2] = output;
	expect(order1.code).toBe("202100000001");
	expect(order1.total).toBe(5132);
	expect(order2.code).toBe("202100000002");
	expect(order2.total).toBe(5132);

    // method 2: It uses the CQRS (queries) approach - less structured, but more scalable and performatic
    // writting model and reading model are different
	const getOrdersQuery = new GetOrdersQuery(connection);
	const outputQuery = await getOrdersQuery.execute();
});

test("It should get the saed orders", async function() {
    // const itemRepository = new ItemRepositoryMemory();
	// itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3));
	// itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20));
	// itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
	// const couponRepository = new CouponRepositoryMemory();
	const placeOrder = new PlaceOrder(repositoryFactory, queue);
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
    
    const getOrders = new GetOrders(repositoryFactory);
    const output = await getOrders.execute();
    expect(output).toHaveLength(1);
    const [order] = output;
    expect(order.code).toBe("202100000001");
    expect(order.total).toBe(6350);
});

afterEach(async function () {
   await connection.close(); 
});