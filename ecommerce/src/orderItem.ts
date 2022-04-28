export class OrderItem {
    description: string;
    price: number;
    quantity: number;

    constructor(description: string, price: number, quantity: number) {
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }

    public getTotal () {
        return this.price * this.quantity;
    }
}