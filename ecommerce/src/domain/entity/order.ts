import { Cpf } from './cpf';
import { Coupon } from "./coupon";
import { Shipping } from "./shipping";
import { Item } from "./item";
import { OrderItem } from './orderItem';
import { OrderCode } from './orderCode';

export class Order {
    private _cpf: Cpf;
    private _date: Date;
    private _orderItemList: OrderItem[];
    private _discountCupon?: Coupon;
    shipping = new Shipping();
    code: OrderCode;

    constructor(cpf: string, date: Date = new Date(), readonly sequence = 1) {
        this._cpf = new Cpf(cpf);
        this._date = date;
        this._orderItemList = [];
        this.code = new OrderCode(date, sequence);
    }

    public get orderItems() {
        return this._orderItemList;
    }

    public set orderItems(orderItems: OrderItem[]) {
        this._orderItemList = orderItems;
    }
    
    public get coupon(): Coupon | undefined {
        return this._discountCupon;
    }

    public set coupon(coupon: Coupon | undefined) {
        this._discountCupon = coupon;
    }

    public get date() {
        return this._date;
    }

    public set date(date: Date) {
        this._date = date;
    }

    public get cpf() {
        return this._cpf;
    }

    public addItem(item: Item, quantity: number) {
        if(this.isDuplicated(item)) throw new Error("Duplicated item");
        this.shipping.addItem(item, quantity);
        const { idItem, price } = item;
        this._orderItemList.push(new OrderItem(idItem, price, quantity));
    }

    private isDuplicated (item: Item) {
		return this.orderItems.some(orderItem => orderItem.idItem === item.idItem);
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

        if(this.coupon) {
            total -= this.coupon.calculateDiscount(total);
        }

        total += this.shipping.totalValue();

        return total;
    }

    public calculateShippiment( ) {
        return this.shipping.totalValue();
    }

}
