const puppeteer = require("puppeteer");

class ScrapTask {
	constructor({ url, task }) {
		this.url = url ? url : "";
		this.task = task ? task : () => true;
	}
}

class Scraper {
	constructor() {
		this.browser = null;
	}

	async init() {
		this.browser = await puppeteer.launch();
	}

	async scrap(url, fn) {
		console.log("start scraping...");
		const page = await this.browser.newPage();
		await page.goto(url);
		const result = await fn(page);
		page.close();
		return result;
	}

	async select_all(url, query, format, validate = () => true) {
		const data = await this.scrap(url, async (page) => {
			return page.$$eval(query, format);
		});
		return data.filter(validate);
	}
}

async function scrap() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.smashbros.com/en_US/fighter/index.html");

	const data = await page.evaluate((test) => {
		console.log(test);
		const elems = document.querySelectorAll("li.fighter-list__item");
		let formated_data = [];

		for (let index = 0; index < elems.length; index++) {
			const name = elems[index].querySelector("p.fighter-list__name-main")
				.innerText;
			const id = elems[index].querySelector("em.fighter-list__num-txt")
				.innerText;
			formated_data.push({ id, name });
		}

		return formated_data;
	}, test);
	console.log(data);
	browser.close();
}

module.exports = {
	scrap,
	Scraper,
	ScrapTask,
};
