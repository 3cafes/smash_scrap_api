const router = require('express').Router();

router.use('/player', require('./player'));
router.use('/item', require('./item'));
router.use('/stage', require('./stage'));

module.exports = router;
