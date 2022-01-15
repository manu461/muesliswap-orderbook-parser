import { config } from "./config/config";
import { htmlToJsonParser } from "./src/htmlParser";
import { requestHtml } from "./src/htmlRequester";
import { getBuyVolume, getSellVolume, matchOrder } from "./src/matchingEngine";

require('dotenv').config()

async function main() {
    const currentTickerUrl = config.Assets[config.CurrentTicker];
    const htmlString = await requestHtml(currentTickerUrl);

    var orderBookModel = await htmlToJsonParser(htmlString);
    const buyVolume = getBuyVolume(orderBookModel.buyOrders);
    const sellVolume = getSellVolume(orderBookModel.sellOrders);
    console.log(`Buy Volume : ${buyVolume}`);
    console.log(`Sell Volume : ${sellVolume}`);

    const resolvedOrderBookModel = matchOrder(orderBookModel);
    const resolvedBuyVolume = getBuyVolume(resolvedOrderBookModel.buyOrders);
    const resolvedSellVolume = getSellVolume(resolvedOrderBookModel.sellOrders);
    console.log(`Resolved Buy Volume : ${resolvedBuyVolume}`);
    console.log(`Resolved Sell Volume : ${resolvedSellVolume}`);
}

main();
