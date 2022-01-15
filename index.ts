import { config } from "./config/config";
import { getAllListings, getListingUrlByTicker, storeListingInJson } from "./src/listingUtils";
import { htmlOrderToJsonOrderParser } from "./src/htmlParser";
import { requestHtml } from "./src/htmlRequester";
import { getBuyVolume, getSellVolume, matchOrder } from "./src/matchingEngine";

require('dotenv').config()
var htmlToJson = require('html-to-json');

async function main() {
    // await storeListingInJson(await getAllListings());
    const currentTickerUrl = getListingUrlByTicker(config.CurrentTicker);
    const htmlString = await requestHtml(currentTickerUrl);

    var orderBookModel = await htmlOrderToJsonOrderParser(htmlString);
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
