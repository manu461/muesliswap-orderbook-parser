import { Order, OrderBookModel } from './models/orderBook';

export function matchOrder(rawOrderBook: OrderBookModel): OrderBookModel {
    const resolvedOrderBookModel = <OrderBookModel>{};
    const resolvedBuyOrders = <Order[]>[];
    const resolvedSellOrders = <Order[]>[];
    const orderMap = new Map<number, number>();
    // add buy order in the order map
    rawOrderBook.buyOrders.forEach((buyOrder) => {
        if (orderMap.has(buyOrder.PricePerToken)) {
            orderMap.set(buyOrder.PricePerToken, orderMap.get(buyOrder.PricePerToken) + buyOrder.Amount);
        } else {
            orderMap.set(buyOrder.PricePerToken, +buyOrder.Amount)
        }
    })

    // add sell order in the order map
    rawOrderBook.sellOrders.forEach((sellOrder) => {
        if (orderMap.has(sellOrder.PricePerToken)) {
            orderMap.set(sellOrder.PricePerToken, orderMap.get(sellOrder.PricePerToken) - sellOrder.Amount);
        } else {
            orderMap.set(sellOrder.PricePerToken, -sellOrder.Amount)
        }
    })

    for (let [key, value] of orderMap) {
        const order = <Order>{};
        order.PricePerToken = key
        if (value < 0) {
            order.Amount = -value;
            order.Total = key * (-value);
            resolvedSellOrders.push(order);
        } else {
            order.Amount = value;
            order.Total = key * value;
            resolvedBuyOrders.push(order);
        }
    }
    resolvedBuyOrders.sort((a, b) => (a.PricePerToken > b.PricePerToken ? -1 : 1));
    resolvedSellOrders.sort((a, b) => (a.PricePerToken < b.PricePerToken ? -1 : 1));
    resolvedOrderBookModel.buyOrders = resolvedBuyOrders;
    resolvedOrderBookModel.sellOrders = resolvedSellOrders;
    return resolvedOrderBookModel;
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