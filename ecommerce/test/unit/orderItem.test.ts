import { OrderItem } from "../../src/domain/entity/orderItem";

test("check valid orderItem shipping value", function () {
    const orderItem = new OrderItem(1, 1000, 2);
	expect(orderItem.getTotal()).toBe(2000);
});