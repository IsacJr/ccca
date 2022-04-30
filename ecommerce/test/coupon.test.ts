import { Coupon } from "../src/coupon";

test("It should create a valid coupon", function () {
	// arrange
	const currentDate = new Date();
	const coupon = new Coupon("20-OFF", 20, currentDate);
	expect(coupon.calculateDiscount(1000)).toBe(200);
});