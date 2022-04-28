import Coupon from "../src/coupon";
import { Order } from "../src/order";
import { OrderItem } from "../src/orderItem";

test("check if 3 products was inserted", function () {
    // arrange
    const orderMocked = new Order('21604693002');
    const productTotal = 3;
    // action
    orderMocked.addItem(new OrderItem('description', 1, 1));
    orderMocked.addItem(new OrderItem('description', 1, 1));
    orderMocked.addItem(new OrderItem('description', 1, 1));
    // expert
    expect(orderMocked.productList.length).toBe(productTotal);
});

test("check if cupon applied", function () {
    // arrange
    const orderMocked = new Order('21604693002');
    const cupon = new Coupon("20-OFF", 20);
    const expectedTotal = 80;
    // action
    orderMocked.addItem(new OrderItem('ball', 20, 5));
    orderMocked.addCoupon(cupon);
    // expert
    expect(orderMocked.calculateTotal()).toBe(expectedTotal);
});

test("check if total is correct", function () {
    // arrange
    const orderMocked = new Order('21604693002');
    const totalExpected = 100;
    // action
    orderMocked.addItem(new OrderItem('ball', 20, 5));
    const calculatedTotal = orderMocked.calculateTotal();
    // expert
    expect(calculatedTotal).toBe(totalExpected);
})