import { OrderRepository } from "../domain/repository/OrderRepository";

export class GetOrder {
    
    constructor(readonly orderRepository: OrderRepository) {

    }

    async execute(code: string) : Promise<Output> {
        const order = await this.orderRepository.get(code);
        return {
            code: order.code.value, 
            total: order.calculateTotal()
        }
    }

}

type Output = {
    code: string,
    total: number
}