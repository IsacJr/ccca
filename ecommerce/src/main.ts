import { ItemController } from "./infra/controller/ItemController";
import { OrderController } from "./infra/controller/OrderController";
import { PgPromiseConnectionAdapter } from "./infra/database/PgPromiseConnectionAdapter";
import { DatabaseRepositoryFactory } from "./infra/factory/DatabaseRepositoryFactory";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { ItemRepositoryDatabase } from "./infra/repository/database/ItemRepositoryDatabase";

const http = new ExpressAdapter();

const connection = new PgPromiseConnectionAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const repositoryFactory = new DatabaseRepositoryFactory(connection);

new ItemController(http, itemRepository);
new OrderController(http, repositoryFactory);

http.listen(3000);