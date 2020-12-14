const router = require('express').Router();

router.use('/player', require('./player'));
router.use('/item', require('./item'));

module.exports = router;
