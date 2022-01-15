import { Order, OrderBookModel } from '../models/orderBook';
import { getBuyVolume, getSellVolume, matchOrder } from '../matchingEngine';
const orderBookModel = <OrderBookModel>{};
const buyOrders = <Order[]>[]
let buyOrder = <Order>{}
buyOrder.Amount = 1000;
buyOrder.PricePerToken = 2;
buyOrder.Total = buyOrder.Amount * buyOrder.PricePerToken;
buyOrders.push(buyOrder)
buyOrder = <Order>{}
buyOrder.Amount = 2000;
buyOrder.PricePerToken = 1;
buyOrder.Total = buyOrder.Amount * buyOrder.PricePerToken;
buyOrders.push(buyOrder)
buyOrder = <Order>{}
buyOrder.Amount = 1500;
buyOrder.PricePerToken = 2;
buyOrder.Total = buyOrder.Amount * buyOrder.PricePerToken;
buyOrders.push(buyOrder)
orderBookModel.buyOrders = buyOrders;

const sellOrders = <Order[]>[]
let sellOrder = <Order>{}
sellOrder.Amount = 300;
sellOrder.PricePerToken = 1;
sellOrder.Total = sellOrder.Amount * sellOrder.PricePerToken;
sellOrders.push(sellOrder)
sellOrder = <Order>{}
sellOrder.Amount = 5000;
sellOrder.PricePerToken = 1; orderBookModel
sellOrder.Total = sellOrder.Amount * sellOrder.PricePerToken;
sellOrders.push(sellOrder)
sellOrder = <Order>{}
sellOrder.Amount = 10000;
sellOrder.PricePerToken = 2.1;
sellOrder.Total = sellOrder.Amount * sellOrder.PricePerToken;
sellOrders.push(sellOrder)
orderBookModel.sellOrders = sellOrders;

console.log(orderBookModel.buyOrders)
console.log(getBuyVolume(orderBookModel.buyOrders));
console.log(orderBookModel.sellOrders)
console.log(getSellVolume(orderBookModel.sellOrders));

const resolvedOrderBookModel = matchOrder(orderBookModel)

console.log(getBuyVolume(resolvedOrderBookModel.buyOrders));
console.log(getSellVolume(resolvedOrderBookModel.sellOrders));
