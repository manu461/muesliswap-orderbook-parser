import { htmlToJsonParser } from "./src/htmlParser";
import { requestHtml } from "./src/htmlRequester";

require('dotenv').config()

async function main() {
    const htmlString = await requestHtml("https://ada.muesliswap.com/swap/token/8a1cfae21368b8bebbbed9800fec304e95cce39a2a57dc35e2e3ebaa.MILK");
    var res = await htmlToJsonParser(htmlString)
    console.log(res.buyOrders);
    // console.log(res.sellOrders);
}

main();
