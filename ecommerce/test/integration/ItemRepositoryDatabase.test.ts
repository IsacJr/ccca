import { PgPromiseConnectionAdapter } from "../../src/infra/database/PgPromiseConnectionAdapter";
import { ItemRepositoryDatabase } from "../../src/infra/repository/database/ItemRepositoryDatabase";

test.skip("It should return items from the database", async function () {
	const connection = new PgPromiseConnectionAdapter();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const items = await itemRepository.list();
	expect(items).toHaveLength(1);
});