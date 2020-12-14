const router = require('express').Router();
const db = require.main.require('./database');
const { update_players } = require.main.require('./smash_scrap');

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
		const success = await update_players();
		if (success) {
			res.status(200).json('players scrapped');
		} else {
			res.status(500).json('fail to scrap players');
		}
	} catch (e) {
		console.log(e);
		res.status(500).send('internal server error');
	}
});

module.exports = router;
