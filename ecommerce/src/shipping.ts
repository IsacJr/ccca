import { OrderItem } from "./orderItem";

export class Shipping {
    private readonly MIN_VALUE = parseFloat((10).toFixed(2));

    constructor(readonly orderItemList: OrderItem[], readonly distance: number){ }

    public totalValue() {
        
        let total = this.orderItemList.reduce((total, orderItem) => {
            total += orderItem.getShippingValue(this.distance);
            return total;
        }, 0);

        total = total > this.MIN_VALUE ? total : this.MIN_VALUE;

        return parseFloat(total.toFixed(2));
    }
}