import { GetOrder } from "../../src/application/GetOrder";
import { PlaceOrder } from "../../src/application/PlaceOrder";
import { RepositoryFactory } from "../../src/domain/factory/RepositoryFactory";
import { OrderRepository } from "../../src/domain/repository/OrderRepository";
import { IConnection } from "../../src/infra/database/IConnection";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import MemoryQueueAdapter from "../../src/infra/event/MemoryQueueAdapter";
import Queue from "../../src/infra/event/Queue";
import RabbitMQAdapter from "../../src/infra/event/RabbitMQAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

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

test("It should get a order by code", async function() {
    // const itemRepository = new ItemRepositoryMemory();
	// itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(1, 0.3, 0.1), 3));
	// itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(0.5, 0.5, 0.5), 20));
	// itemRepository.save(new Item(3, "Cabo", 30, new Dimension(0.1, 0.1, 0.1), 1));
	// const couponRepository = new CouponRepositoryMemory();
    // couponRepository.save(new Coupon("20-OFF", 20, new Date("2021-03-10T10:00:00")));
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
    
    const getOrder = new GetOrder(orderRepository);
    const output = await getOrder.execute("202100000001");
    expect(output.code).toBe("202100000001");
    expect(output.total).toBe(5132);
});

afterEach(async function () {
   await connection.close(); 
});