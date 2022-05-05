import { Coupon } from "../../src/domain/entity/coupon";
import { Dimension } from "../../src/domain/entity/dimension";
import { Item } from "../../src/domain/entity/item";
import { Order } from "../../src/domain/entity/order";

test("check if 3 products was inserted", function () {
    // arrange
    const orderMocked = new Order('21604693002');
    const productTotal = 6090;
    orderMocked.addItem(new Item(1, "Guitarra", 1000), 1);
	orderMocked.addItem(new Item(2, "Amplificador", 5000), 1);
	orderMocked.addItem(new Item(3, "Cabo", 30), 3);
    
    // action
    const total = orderMocked.calculateTotal();

    // expert
    expect(orderMocked.calculateTotal()).toBe(productTotal);
});

test("check if cupon applied", function () {
    // arrange
    const orderMocked = new Order('21604693002');
    const expectedTotal = 4872;
    orderMocked.addItem(new Item(1, "Guitarra", 1000), 1);
    orderMocked.addItem(new Item(2, "Amplificador", 5000), 1);
    orderMocked.addItem(new Item(3, "Cabo", 30), 3);
    orderMocked.addCoupon(new Coupon('20-0ff', 20));
    
    // action
    const total = orderMocked.calculateTotal();

    // expert
    expect(orderMocked.calculateTotal()).toBe(expectedTotal);
});

test("check if cupon is expired", function () {
    // arrange
    const orderMocked = new Order('21604693002');
    const expectedTotal = 6090;
    orderMocked.addItem(new Item(1, "Guitarra", 1000), 1);
    orderMocked.addItem(new Item(2, "Amplificador", 5000), 1);
    orderMocked.addItem(new Item(3, "Cabo", 30), 3);
    const currentDate = new Date();
	const dateMocked = new Date(currentDate.setDate(currentDate.getDate() - 3));
    orderMocked.addCoupon(new Coupon("20-OFF", 20, dateMocked));
    
    // action
    const total = orderMocked.calculateTotal();

    // expert
    expect(total).toBe(expectedTotal);
});

test("It should create an order with 3 items and calculate the shipping", function () {
	const order = new Order("216.046.930-02");
	order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3), 1);
	order.addItem(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20), 1);
	order.addItem(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1), 3);
	const freight = order.calculateShippiment();
	const total = order.calculateTotal();

	expect(freight).toBe(260);
	expect(total).toBe(6350);
});