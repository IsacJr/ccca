import GetStock from "../../src/application/GetStock";
import { PlaceOrder } from "../../src/application/PlaceOrder";
import { RepositoryFactory } from "../../src/domain/factory/RepositoryFactory";
import { OrderRepository } from "../../src/domain/repository/OrderRepository";
import StockEntryRepository from "../../src/domain/repository/StockEntryRepository";
import StockController from "../../src/infra/controller/StockController";
import { IConnection } from "../../src/infra/database/IConnection";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import MemoryQueueAdapter from "../../src/infra/event/MemoryQueueAdapter";
import Queue from "../../src/infra/event/Queue";
import RabbitMQAdapter from "../../src/infra/event/RabbitMQAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let connection: IConnection;
let orderRepository: OrderRepository;
let stockEntryRepository: StockEntryRepository;
let repositoryFactory: RepositoryFactory;
let queue: Queue;

beforeEach(async function () {
    connection = new PgPromiseConnectionAdapter();
	repositoryFactory = new DatabaseRepositoryFactory(connection);
    orderRepository = new OrderRepositoryDatabase(connection);
    await orderRepository.clear();
	stockEntryRepository = repositoryFactory.createStockEntryRepository();
	await stockEntryRepository.clear();
	// queue = new MemoryQueueAdapter();
	queue = new RabbitMQAdapter();
	await queue.connect();
});

test("It should make an order", async function () {
	// const itemRepository = new ItemRepositoryDatabase(connection);
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
		]
	};
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(6350);
});

test("It should make an order and generate order code", async function () {
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
	const output = await placeOrder.execute(input);
	expect(output.code).toBe("202100000001");
});

test("It should make an order with discount", async function () {
	// const itemRepository = new ItemRepositoryMemory();
	// itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3));
	// itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20));
	// itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
	// const couponRepository = new CouponRepositoryMemory();
	// couponRepository.save(new Coupon("20-OFF", 20, new Date("2021-03-01T10:00:00")));
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
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(5132);
});

function sleep (ms: number) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, ms);
	});
}

test.only("It should make a order and throw it on the stock", async function () {
	new StockController(queue, repositoryFactory);
	const placeOrder = new PlaceOrder(repositoryFactory, queue);
	const input = {
		cpf: "935.411.347-80",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		]
	};
	await placeOrder.execute(input);
	await sleep(200);
	const getStock = new GetStock(repositoryFactory);
	const output = await getStock.execute(3);
	expect(output.total).toBe(-3);
});

afterEach(async function () {
	await queue.close();
	await connection.close(); 
 });
 