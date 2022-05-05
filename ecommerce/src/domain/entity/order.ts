import { Cpf } from './cpf';
import { Coupon } from "./coupon";
import { Shipping } from "./shipping";
import { Item } from "./item";
import { OrderItem } from './orderItem';

export class Order {
    private _cpf: Cpf;
    private _date: Date;
    private _orderItemList: OrderItem[];
    private _discountCupon?: Coupon;
    shipping = new Shipping();

    constructor(cpf: string, date: Date = new Date()) {
        this._cpf = new Cpf(cpf);
        this._date = date;
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

    public addItem(item: Item, quantity: number) {
        this.shipping.addItem(item, quantity, 1000);
        const { idItem, price } = item;
        this._orderItemList.push(new OrderItem(idItem, price, quantity));
    }

    public addCoupon(coupon: Coupon) {
        if(!coupon.isExpired(this._date))
            this._discountCupon = coupon;
    }

    public calculateTotal() {
        let total = this._orderItemList.reduce((total, item) => {
            total += item.getTotal();
            return total;
        }, 0);

        if(this.discountCupon) {
            total -= this.discountCupon.calculateDiscount(total);
        }

        total += this.shipping.totalValue();

        return total;
    }

    public calculateShippiment( ) {
        return this.shipping.totalValue();
    }

}
