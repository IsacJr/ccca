import { Item } from "./item";
import { OrderItem } from "./orderItem";

export class Shipping {
    private readonly MIN_VALUE = parseFloat((10).toFixed(2));
    private FACTOR = 100;
    private total = 0;

    public addItem(item: Item, quantity: number, distance: number){
        const shipping = item.getVolume() * distance * (item.getDensity()/this.FACTOR);
        this.total += shipping * quantity;
    }

    public totalValue() {
        
        return (this.total > 0 && this.total < this.MIN_VALUE) ? this.MIN_VALUE : this.total;
    }
}