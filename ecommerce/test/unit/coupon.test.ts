import { Coupon } from "../../src/domain/entity/coupon";

test("It should create a coupon", function () {
	// arrange
	const coupon = new Coupon("20-OFF", 20);
	expect(coupon.calculateDiscount(1000)).toBe(200);
});

test("It should create a valid coupon", function () {
	// arrange
	const currentDate = new Date();
	const dateMocked = new Date(currentDate.setDate(currentDate.getDate() - 3));
	const coupon = new Coupon("20-OFF", 20, dateMocked);

	const isExpired = coupon.isExpired(new Date());

	expect(isExpired).toBe(true);
});