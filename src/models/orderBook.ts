export interface OrderBookModel {
    buyOrders: Order[],
    sellOrders: Order[],
}

export interface Order {
    Amount: number,
    PricePerToken: number,
    Total: number,
}