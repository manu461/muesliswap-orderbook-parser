import puppeteer from 'puppeteer';

export async function requestHtml(url: string): Promise<string> {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await browser.close();
    return data;
}