import { amountParser, pricePerTokenParser } from "./attributeParser";
import { Order, OrderBookModel } from "./models/orderBook";

var htmlToJson = require('html-to-json');

export function htmlOrderToJsonOrderParser(htmlOrder: string): Promise<OrderBookModel> {
    return new Promise<OrderBookModel>((resolve, reject) => {
        htmlToJson.parse(htmlOrder, function () {
            return this.map('p', function ($item: { text: () => any; }) {
                return $item.text();
            });
        }).done(function (items: string[]) {
            resolve(stringToModel(items));
        }, function (err: any) {
            reject(err);
        });
    });
}

function stringToModel(orders: string[]): OrderBookModel {
    const orderBookModel = <OrderBookModel>{};
    const buyOrders = <Order[]>[];
    const sellOrders = <Order[]>[];
    for (let index = 4; index < orders.length; index += 4) {
        const order = <Order>{};
        order.Amount = amountParser(orders[index]);
        order.PricePerToken = pricePerTokenParser(orders[index + 1]);
        order.Total = order.Amount * order.PricePerToken;
        if (orders[index + 3] === 'BUY') { // BUY button is for a sell order
            sellOrders.push(order)
        } else if (orders[index + 3] === 'SELL') { // SELL button is for a buy order
            buyOrders.push(order)
        }
    }
    orderBookModel.buyOrders = buyOrders;
    orderBookModel.sellOrders = sellOrders
    return orderBookModel;
}


export async function htmlListingToJsonListingParser(htmlListing: string): Promise<Map<string, string>> {
    const listingMap = new Map<string, string>();
    var linkParser = htmlToJson.createParser(['a[href]', {
        'text': function ($a: { text: () => any; }) {
            return $a.text();
        },
        'href': function ($a: { attr: (arg0: string) => any; }) {
            return $a.attr('href');
        }
    }]);
    const links: { text: string, href: string }[] = await linkParser.parse(htmlListing);
    links.forEach((link) => {
        if (link.href.includes('/markets/token')) {
            listingMap.set(link.text.split(' ')[1], link.href);
        }
    })
    return listingMap;
}