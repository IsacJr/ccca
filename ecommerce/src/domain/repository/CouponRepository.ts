import { Coupon } from "../entity/coupon";

export interface CouponRepository {
	get(code: string): Promise<Coupon>;
	save(coupon: Coupon): Promise<void>;
}