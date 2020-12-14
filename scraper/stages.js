const scraper = require('./base');

const BASE_URL = 'https://www.smashbros.com';

async function download_stages_img(stages) {
	return Promise.all(
		stages.map(async (stage) => {
			const img_blob = await scraper.scrap_image(`${BASE_URL}${stage.img_url}`);
			return { ...stage, img_blob: img_blob };
		})
	);
}

async function scrap_stages() {
	const stages = await scraper.scrap_page(
		`${BASE_URL}/en_US/stage/index.html`,
		async (page) => {
			const data = await page.$$eval('li.stage-box-list__item', (elems) => {
				return elems.map((elem) => {
					let name;
					let img_url;
					try {
						name = elem.querySelector('div.stage-box__name').innerText;
						img_url = elem
							.querySelector('span.stage-box__img-thumb')
							.style.backgroundImage.split('"')[1];
					} catch (e) {}
					return {
						name,
						img_url,
					};
				});
			});
			return data.filter((entry) => entry.name && entry.img_url);
		}
	);
	return download_stages_img(stages);
}

module.exports = {
	scrap_stages,
};
