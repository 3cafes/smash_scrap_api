const router = require('express').Router();
const { scrap_players } = require.main.require('./smash/scrap');

router.get('/all', async (req, res) => {
	const data = await scrap_players();
	res.json(data);
});

module.exports = router;
