import { ValidateCoupon } from "../../src/application/ValidateCoupon";
import { Coupon } from "../../src/domain/entity/coupon";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";

test("It should validate an expired discount coupon", async function () {
	const couponRepository = new CouponRepositoryMemory();
	couponRepository.save(new Coupon("VALE20", 20, new Date("2021-03-01T10:00:00")));
	const validateCoupon = new ValidateCoupon(couponRepository);
	const input = {
		code: "VALE20",
		date: new Date("2021-03-10T10:00:00")
	}
	const output = await validateCoupon.execute(input);
	expect(output.isExpired).toBeTruthy();
});

test("It should validate an valid discount coupon", async function () {
	const couponRepository = new CouponRepositoryMemory();
	couponRepository.save(new Coupon("VALE20", 20, new Date("2021-03-12T10:00:00")));
	const validateCoupon = new ValidateCoupon(couponRepository);
	const input = {
		code: "VALE20",
		date: new Date("2021-03-10T10:00:00")
	}
	const output = await validateCoupon.execute(input);
	expect(output.isExpired).toBeFalsy();
});