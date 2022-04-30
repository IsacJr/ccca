import { Dimensions } from "./dimensions";

export class OrderItem {
    description: string;
    price: number;
    quantity: number;
    dimension: Dimensions;


    constructor(description: string, price: number, quantity: number, dimensions: Dimensions) {
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.dimension = dimensions;
    }

    public getTotal () {
        return this.price * this.quantity;
    }

    public getShippingValue(distance: number){
        const { heigth, width, depth, weight } = this.dimension;
        
        const volume = heigth * width * depth;
        const density = weight / volume;
        
        const price = distance * (volume * (density/100) * this.quantity)
        return parseInt(price.toFixed(2));
    }
}