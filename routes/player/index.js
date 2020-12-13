const router = require('express').Router();
const { scrap_players } = require.main.require('./scraper/player');
const db = require.main.require('./database');

router.get('/all', async (req, res) => {
	try {
		const players = await db.player.findMany();
		res.status(200).json(players);
	} catch (e) {
		console.log(e);
		res.status(500).send('internal server error');
	}
});

router.get('/scrap', async (req, res) => {
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
		res.status(200).json('players scrapped');
	} catch (e) {
		console.log(e);
		res.status(500).send('internal server error');
	}
});

module.exports = router;
