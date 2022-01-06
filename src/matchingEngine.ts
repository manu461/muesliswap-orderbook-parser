import { Order } from "./models/orderBook";

export function matchOrder(buyOrders: Order[], sellOrders: Order[]): Order[] {
    return <Order[]>{};
}

export function getBuyVolume(buyOrders: Order[]): number {
    let buyVolume = 0;
    buyOrders.forEach((buyOrder) => {
        buyVolume += buyOrder.Total
    })
    return buyVolume;
}

export function getSellVolume(sellOrders: Order[]): number {
    let sellVolume = 0;
    sellOrders.forEach((sellOrder) => {
        sellVolume += sellOrder.Total
    })
    return sellVolume;
}