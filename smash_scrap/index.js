/**
 * high level functions
 * used by cli and express routes
 */

const { scrap_players, scrap_items, scrap_stages } = require.main.require(
	'./scraper'
);
const db = require.main.require('./database');

async function update_players() {
	try {
		const players = await scrap_players();
		for (let idx = 0; idx < players.length; idx++) {
			const player = players[idx];
			console.log(`store player ${player.name}...`);
			await db.player.upsert({
				where: { name: player.name },
				update: { player_id: player.id, img_blob: player.img_blob },
				create: {
					name: player.name,
					player_id: player.id,
					img_blob: player.img_blob,
				},
			});
		}
		console.log('done !');
	} catch (e) {
		console.log(e);
		console.log('failed to update players.');
		return false;
	}
	return true;
}

async function update_items() {
	try {
		const items = await scrap_items();
		for (let idx = 0; idx < items.length; idx++) {
			const item = items[idx];
			console.log(`store item ${item.name}...`);
			await db.item.upsert({
				where: { name: item.name },
				update: { img_blob: item.img_blob },
				create: {
					name: item.name,
					img_blob: item.img_blob,
				},
			});
		}
		console.log('done !');
	} catch (e) {
		console.log(e);
		console.log('failed to update items.');
		return false;
	}
	return true;
}

async function update_stages() {
	try {
		const stages = await scrap_stages();
		for (let idx = 0; idx < stages.length; idx++) {
			const stage = stages[idx];
			console.log(`store stages ${stage.name}...`);
			await db.stage.upsert({
				where: { name: stage.name },
				update: { img_blob: stage.img_blob },
				create: {
					name: stage.name,
					img_blob: stage.img_blob,
				},
			});
		}
		console.log('done !');
	} catch (e) {
		console.log(e);
		console.log('failed to update stages.');
		return false;
	}
	return true;
}

module.exports = {
	update_players,
	update_items,
	update_stages,
};
