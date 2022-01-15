import { config } from "../config/config";
import { htmlListingToJsonListingParser } from "./htmlParser";
import { requestHtml } from "./htmlRequester";
var fs = require('fs');
import listingJson from '../listing.json';

export async function getAllListings()
    : Promise<Map<string, string>> {
    const marketHomePageUrl = `${config.BaseUrl}/markets`;
    const htmlData = await requestHtml(marketHomePageUrl);
    const listingMap = await htmlListingToJsonListingParser(<string>htmlData);
    return listingMap;
}

export async function storeListingInJson(listingMap: Map<string, string>) {
    var data = {}
    listingMap.forEach(function (value, key) {
        data[key] = value;
    });
    await fs.writeFileSync("listing.json", JSON.stringify(data));
}

export function getListingUrlByTicker(ticker: string): string {
    return `${config.BaseUrl}${listingJson[ticker]}`;
}