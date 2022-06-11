import { ItemController } from "./infra/controller/ItemController";
import { OrderController } from "./infra/controller/OrderController";
import StockController from "./infra/controller/StockController";
import { PgPromiseConnectionAdapter } from "./infra/database/PgPromiseConnectionAdapter";
import MemoryQueueAdapter from "./infra/event/MemoryQueueAdapter";
import RabbitMQAdapter from "./infra/event/RabbitMQAdapter";
import { DatabaseRepositoryFactory } from "./infra/factory/DatabaseRepositoryFactory";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { ItemRepositoryDatabase } from "./infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "./infra/repository/database/OrderRepositoryDatabase";

const http = new ExpressAdapter();

const queue = new MemoryQueueAdapter();
// const queue = new RabbitMQAdapter();

const connection = new PgPromiseConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryDatabase(connection);
const repositoryFactory = new DatabaseRepositoryFactory(connection);

new ItemController(http, itemRepository);
new OrderController(http, repositoryFactory);
new StockController(queue, repositoryFactory);

http.listen(3000);