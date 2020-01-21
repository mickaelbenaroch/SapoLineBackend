//load all controller 
'use strict';

const express = require('express'),
router        = express.Router();

router.use('/user',require('./user')),
router.use('/item',require('./item')),
router.use('/order',require('./order')),

module.exports = router