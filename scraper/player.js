const scraper = require.main.require('./scraper');

const BASE_URL = 'https://www.smashbros.com';

async function download_players_img(players) {
	return Promise.all(
		players.map(async (player) => {
			const img_blob = await scraper.scrap_image(
				`${BASE_URL}${player.img_url}`
			);
			return { ...player, img_blob: img_blob };
		})
	);
}

async function scrap_players() {
	const players = await scraper.scrap_page(
		`${BASE_URL}/en_US/fighter/index.html`,
		async (page) => {
			const data = await page.$$eval('li.fighter-list__item', (elems) => {
				return elems.map((elem) => {
					const id = elem.querySelector('em.fighter-list__num-txt').innerText;
					const name = elem.querySelector('p.fighter-list__name-main')
						.innerText;
					const img_url = elem
						.querySelector('div.fighter-list__img')
						.style.backgroundImage.split('"')[1];
					return {
						id,
						name,
						img_url,
					};
				});
			});
			return data.filter((entry) => entry.id && entry.name);
		}
	);
	return download_players_img(players);
}

module.exports = {
	scrap_players,
};
