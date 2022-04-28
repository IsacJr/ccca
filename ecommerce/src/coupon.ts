export default class Coupon {
    
    public code: string;
    public percentage: number;


    constructor(code: string, percentage: number) {
        this.code = code;
        this.percentage = percentage;
    }

    calculateDiscount(total: number) {
        return (total * this.percentage)/100;
    }

}