/**
 * high level functions
 * used by cli and express routes
 */

const { scrap_players } = require.main.require('./scraper/player');
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
	} catch (e) {
		console.log(e);
		console.log('failed to update players.');
		return false;
	}
	return true;
}

module.exports = {
	update_players,
};
