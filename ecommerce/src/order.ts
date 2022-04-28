import { OrderItem } from "./orderItem";
import { Cpf } from './cpf';
import Coupon from "./coupon";

export class Order {
    private _cpf: Cpf;
    private _orderItemList: OrderItem[];
    discountCupon?: Coupon;

    constructor(cpf: string) {
        this._cpf = new Cpf(cpf);
        this._orderItemList = [];
    }

    public get productList() {
        return this._orderItemList;
    }

    public addItem(product: OrderItem) {
        this._orderItemList.push(product);
    }

    public addCoupon(coupon: Coupon) {
        this.discountCupon = coupon;
    }

    public calculateTotal() {
        let total = this._orderItemList.reduce((total, orderItem) => {
            total += orderItem.getTotal();
            return total;
        }, 0);
        if(this.discountCupon) total -= this.discountCupon.calculateDiscount(total);
        return total;
    }

}