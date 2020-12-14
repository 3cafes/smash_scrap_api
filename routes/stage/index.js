const router = require('express').Router();
const db = require.main.require('./database');
const { update_stages } = require.main.require('./smash_scrap');

router.get('/all', async (req, res) => {
	try {
		const stages = await db.stage.findMany();
		res.status(200).json(stages);
	} catch (e) {
		console.log(e);
		res.status(500).send('internal server error');
	}
});

router.get('/scrap', async (req, res) => {
	try {
		const success = await update_stages();
		if (success) {
			res.status(200).json('stages scrapped');
		} else {
			res.status(500).json('fail to scrap stages');
		}
	} catch (e) {
		console.log(e);
		res.status(500).send('internal server error');
	}
});

module.exports = router;
