const scraper = require('./base');

async function download_items_img(items) {
	return Promise.all(
		items.map(async (item) => {
			const img_blob = await scraper.scrap_image(`${BASE_URL}${item.img_url}`);
			return { ...item, img_blob: img_blob };
		})
	);
}

async function scrap_items() {
	const items = await scraper.scrap_page(
		'https://www.smashbros.com/en_US/item/index.html',
		async (page) => {
			const data = await page.$$eval('div.item-item-list__body', (elems) => {
				return elems.map((elem) => {
					let name = '';
					let img_url = '';
					try {
						name = elem.innerText;
						img_url = elem
							.querySelector('.item-item-list__img-thumb')
							.style.backgroundImage.split('"')[1];
					} catch (e) {}
					return {
						name,
						img_url,
					};
				});
			});
			return data.filter((entry) => entry.name !== '');
		}
	);
	return download_items_img(items);
}

module.exports = {
	scrap_items,
};
