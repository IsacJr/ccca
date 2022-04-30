import { Coupon } from "../src/coupon";
import { Dimensions } from "../src/dimensions";
import { Order } from "../src/order";
import { OrderItem } from "../src/orderItem";

test("check if 3 products was inserted", function () {
    // arrange
    const orderMocked = new Order('21604693002');
    const productTotal = 3;
    // action
    const dimensions: Dimensions = { heigth: 1, width: 1, depth: 1, weight: 1 };
    orderMocked.addItem(new OrderItem('description', 1, 1, dimensions));
    orderMocked.addItem(new OrderItem('description', 1, 1, dimensions));
    orderMocked.addItem(new OrderItem('description', 1, 1, dimensions));
    // expert
    expect(orderMocked.productList.length).toBe(productTotal);
});

test("check if cupon applied", function () {
    // arrange
    const dimensions: Dimensions = { heigth: 1, width: 1, depth: 1, weight: 1 };
    const orderMocked = new Order('21604693002');
    const cupon = new Coupon("20-OFF", 20, new Date());
    const expectedTotal = 80;
    // action
    orderMocked.addItem(new OrderItem('ball', 20, 5, dimensions));
    orderMocked.addCoupon(cupon);
    // expert
    expect(orderMocked.calculateTotal()).toBe(expectedTotal);
});

test("check if total is correct", function () {
    // arrange
    const orderMocked = new Order('21604693002');
    const totalExpected = 100;
    const dimensions: Dimensions = { heigth: 1, width: 1, depth: 1, weight: 1 };
    // action
    orderMocked.addItem(new OrderItem('ball', 20, 5, dimensions));
    const calculatedTotal = orderMocked.calculateTotal();
    // expert
    expect(calculatedTotal).toBe(totalExpected);
});
