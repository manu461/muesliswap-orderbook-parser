import { config } from "./config/config";
import { htmlToJsonParser } from "./src/htmlParser";
import { requestHtml } from "./src/htmlRequester";
import { getBuyVolume, getSellVolume } from "./src/matchingEngine";

require('dotenv').config()

async function main() {
    const currentTickerUrl = config.Assets[config.CurrentTicker];
    const htmlString = await requestHtml(currentTickerUrl);
    var res = await htmlToJsonParser(htmlString)
    const buyVolume = getBuyVolume(res.buyOrders)
    const sellVolume = getSellVolume(res.sellOrders)
    console.log(`Buy Volume : ${buyVolume}`);
    console.log(`Sell Volume : ${sellVolume}`);
}

main();
