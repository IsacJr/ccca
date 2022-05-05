import { Dimension } from "./dimension";

export class Item {

    constructor (readonly idItem: number, readonly description: string, readonly price: number, readonly dimension?: Dimension, readonly weight?: number) {
	}

    public getVolume() {

        return this.dimension ? this.dimension?.getVolume() : 0;
    }

    public getDensity() {
        
        if(this.dimension && this.weight)
            return this.weight/this.dimension.getVolume();
            
        return 0;
    }
 
}