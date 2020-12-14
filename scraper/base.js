const puppeteer = require('puppeteer');

var browser = null;

async function init() {
	browser = await puppeteer.launch();
}

async function scrap_page(url, scrap_fn) {
	console.log(`scraping [${url}]...`);
	const page = await browser.newPage();
	await page.goto(url);
	const result = await scrap_fn(page);
	page.close();
	return result;
}

async function scrap_image(url) {
	console.log(`downloading image [${url}]...`);
	const page = await browser.newPage();
	const source = await page.goto(url);
	const buffer = await source.buffer();
	const b64 = buffer.toString('base64');
	page.close();
	return b64;
}

module.exports = {
	browser,
	init,
	scrap_page,
	scrap_image,
};
