export class Coupon {
    
    public code: string;
    public percentage: number;
    public date: Date;


    constructor(code: string, percentage: number, date: Date) {
            if(this.isExpired(date)){
                throw Error("Expired Coupon!");
            }
            this.code = code;
            this.percentage = percentage;
            this.date = date;
    }

    public calculateDiscount(total: number) {
        return (total * this.percentage)/100;
    }

    private isExpired(date: Date) {
        const expirationDate = new Date();
        expirationDate.setDate((expirationDate).getDate() - 15);
        return date.getTime() >= expirationDate.getTime() ? false : true;
    }

}