import { OrderItem } from "../../src/domain/entity/orderItem";

test("check valid orderItem shipping value", function () {
    const orderItem = new OrderItem(1, 1000, 2);
	expect(orderItem.getTotal()).toBe(2000);
});

test("It should thrown an exception if quantity is negative", function () {
	expect(() => new OrderItem(1, 1000, -2)).toThrow(new Error("Invalid quantity"));
});