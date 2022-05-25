import { Coupon } from "../../src/domain/entity/coupon";

test("It should create a coupon", function () {
	// arrange
	const coupon = new Coupon("20-OFF", 20);
	expect(coupon.calculateDiscount(1000)).toBe(200);
});

test("It should create an expired coupon", function () {
	// arrange
	const coupon = new Coupon("20-OFF", 20, new Date("2021-03-01T10:00:00"));

	const isExpired = coupon.isExpired(new Date("2021-03-10T10:00:00"));

	expect(isExpired).toBeTruthy();
});