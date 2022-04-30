import { Dimensions } from "../src/dimensions";
import { OrderItem } from "../src/orderItem";
import { Shipping } from "../src/shipping";

test("create a valid shipping", function () {
    const dimensions: Dimensions = { heigth: 1, width: 0.30, depth: 0.1, weight: 3 }
    const orderItemList = [ new OrderItem("Guitar", 1, 1, dimensions)];
    const distance = 1000;
    const expectedValue = parseFloat((30).toFixed(2));
    const shippingMocked = new Shipping(orderItemList, distance);

    const totalValue = shippingMocked.totalValue();

    expect(totalValue).toBe(expectedValue);
});

test("create a minimal shipping value", function () {
    const dimensions: Dimensions = { heigth: 1, width: 0.1, depth: 0.1, weight: 0.1 }
    const orderItemList = [ new OrderItem("Guitar", 1, 1, dimensions)];
    const distance = 1000;
    const expectedValue = parseFloat((10).toFixed(2));
    const shippingMocked = new Shipping(orderItemList, distance);

    const totalValue = shippingMocked.totalValue();

    expect(totalValue).toBe(expectedValue);
});