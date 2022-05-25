export class OrderItem {
    idItem: number;
    price: number;
    quantity: number;


    constructor(idItem: number, price: number, quantity: number) {
        if (quantity < 0) throw new Error("Invalid quantity");
        this.idItem = idItem;
        this.price = price;
        this.quantity = quantity;
    }

    public getTotal () {
        return this.price * this.quantity;
    }
}