const express = require('express');


const {
  getSynthesize,
} = require('../controller/index');

const router = express.Router();

router.route('/synthesize').get(getSynthesize);


module.exports = router;
