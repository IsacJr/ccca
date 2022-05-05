export class Dimension {
   
    constructor( readonly heigth: number, readonly width: number, readonly depth: number) {
    }

    public getVolume() {
        return this.heigth * this.width * this.depth;
    }

}