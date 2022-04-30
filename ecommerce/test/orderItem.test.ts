import { Dimensions } from "../src/dimensions";
import { OrderItem } from "../src/orderItem";

test("check valid orderItem shipping value", function () {
    const dimensions: Dimensions = { heigth: 1, width: 0.30, depth: 0.1, weight: 3 };
    const orderItem = new OrderItem("Guitar", 1, 1, dimensions);
    const distance = 1000;
    const expectedValue = parseFloat((30).toFixed(2));

    const calculatedValue = orderItem.getShippingValue(distance);

    expect(calculatedValue).toBe(expectedValue);
});