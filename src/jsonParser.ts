import { Order, OrderBookModel } from "./models/orderBook";

export function jsonToOrderBookModel(orderBookJson: JSON): OrderBookModel {
    const orderBookModel = <OrderBookModel>{};
    orderBookModel.buyOrders = buyOrderParser(orderBookJson);
    orderBookModel.sellOrders = sellOrderParser(orderBookJson);
    return orderBookModel;
}

function buyOrderParser(orderBookJson: JSON): Order[] {
    console.log();
    return <Order[]>{};
}

function sellOrderParser(orderBookJson: JSON): Order[] {
    return <Order[]>{};
}