const router = require('express').Router();

router.use('/player', require('./player'));

module.exports = router;
