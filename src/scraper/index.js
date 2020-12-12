const puppeteer = require("puppeteer");

async function scrap() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://www.smashbros.com/en_US/fighter/index.html");

	const data = await page.evaluate(() => {
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
	});
	console.log(data);
	browser.close();
}

module.exports = {
	scrap,
};
