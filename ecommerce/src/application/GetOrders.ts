import { OrderRepository } from "../domain/repository/OrderRepository";

export class GetOrders {
    
    constructor(readonly orderRepository: OrderRepository) {

    }

    async execute() : Promise<Output[]> {
        const output: Output[] = [];
        const orders = await this.orderRepository.list();
        for (const order of orders) {
            output.push({ code: order.code.value, total: order.calculateTotal() });
        }

        return output;
    }
}

type Output = {
    code: string,
    total: number
}