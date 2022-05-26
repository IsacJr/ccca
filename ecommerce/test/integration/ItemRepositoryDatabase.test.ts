
import { RepositoryFactory } from "../../src/domain/factory/RepositoryFactory";
import { OrderRepository } from "../../src/domain/repository/OrderRepository";
import { IConnection } from "../../src/infra/database/IConnection";
import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";
import { ItemRepositoryDatabase } from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let connection: IConnection;
let orderRepository: OrderRepository;
let repositoryFactory: RepositoryFactory;

beforeEach(async function () {
    connection = new PgPromiseConnectionAdapter();
	repositoryFactory = new DatabaseRepositoryFactory(connection);
    orderRepository = new OrderRepositoryDatabase(connection);
    await orderRepository.clear();
});

test("It should return items from the database", async function () {
	const itemRepository = new ItemRepositoryDatabase(connection);
	const items = await itemRepository.list();
	expect(items).toHaveLength(3);
});


afterEach(async function () {
	await connection.close(); 
 });