import { OrderItem } from "./orderItem";
import { Cpf } from './cpf';
import { Coupon } from "./coupon";
import { Shipping } from "./shipping";

export class Order {
    private _cpf: Cpf;
    private _orderItemList: OrderItem[];
    private _discountCupon?: Coupon;

    constructor(cpf: string) {
        this._cpf = new Cpf(cpf);
        this._orderItemList = [];
    }

    public get productList() {
        return this._orderItemList;
    }
    
    public get discountCupon() {
        return this._discountCupon;
    }

    public get cpf() {
        return this._cpf;
    }

    public addItem(product: OrderItem) {
        this._orderItemList.push(product);
    }

    public addCoupon(coupon: Coupon) {
        this._discountCupon = coupon;
    }

    public calculateTotal() {
        let total = this._orderItemList.reduce((total, orderItem) => {
            total += orderItem.getTotal();
            return total;
        }, 0);
        if(this._discountCupon) {
            total -= this._discountCupon.calculateDiscount(total);
        }
        return total;
    }

    public calculateShippiment(distance: number) {
        const shipping = new Shipping(this._orderItemList, distance);

        const total = shipping.totalValue();
        return total;
    }

}
