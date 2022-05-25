import { Item } from "./item";
import { OrderItem } from "./orderItem";

export class Shipping {
    private readonly MIN_VALUE = parseFloat((10).toFixed(2));
    private readonly FACTOR = 100;
    public total = 0;
    private readonly DISTANCE = 1000;

    public addItem(item: Item, quantity: number){
        const shipping = item.getVolume() * this.DISTANCE * (item.getDensity()/this.FACTOR);
        this.total += shipping * quantity;
    }

    public totalValue() {
        
        return (this.total > 0 && this.total < this.MIN_VALUE) ? this.MIN_VALUE : this.total;
    }
}