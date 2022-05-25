export class Dimension {
   
    constructor( readonly height: number, readonly width: number, readonly depth: number) {
        if (width < 0 || height < 0 || depth < 0) throw new Error("Invalid dimension");
    }

    public getVolume() {
        return this.height * this.width * this.depth;
    }

}