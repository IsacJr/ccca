import { ItemController } from "./infra/controller/ItemController";
import { OrderController } from "./infra/controller/OrderController";
import { PgPromiseConnectionAdapter } from "./infra/database/PgPromiseConnectionAdapter";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { ItemRepositoryDatabase } from "./infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "./infra/repository/database/OrderRepositoryDatabase";

const http = new ExpressAdapter();

const connection = new PgPromiseConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryDatabase(connection);

new ItemController(http, itemRepository);
new OrderController(http, orderRepository);

http.listen(3000);