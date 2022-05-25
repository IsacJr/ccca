import { OrderCode } from "../../src/domain/entity/orderCode";

test("It should generate the order code", function () {
	const orderCode = new OrderCode(new Date("2021-03-01T10:00:00"), 1);
	expect(orderCode.value).toBe("202100000001");
});