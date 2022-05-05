export class Coupon {
    
    public code: string;
    public percentage: number;
    public expireDate: Date;


    constructor(code: string, percentage: number, expireDate: Date = new Date()) {
            this.code = code;
            this.percentage = percentage;
            this.expireDate = expireDate;
    }

    public calculateDiscount(total: number) {
        return (total * this.percentage)/100;
    }

    public isExpired(today: Date) {
        return today.getTime() > this.expireDate.getTime();
    }

}