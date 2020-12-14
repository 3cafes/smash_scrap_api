const router = require('express').Router();
const db = require.main.require('./database');
const { update_items } = require.main.require('./smash_scrap');

router.get('/scrap', async (req, res) => {
	try {
		const success = await update_items();
		if (success) {
			res.status(200).json('items scraped');
		} else {
			res.status(500).json('fail to scrap items');
		}
	} catch (e) {
		console.log(e);
		res.status(500).send('internal server error');
	}
});

module.exports = router;
