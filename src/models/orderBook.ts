export interface OrderBookModel {
    buyOrders: Order[],
    sellOrders: Order[],
}

export interface Order {
    Amount: string,
    PricePerToken: string,
    Total: string,
}