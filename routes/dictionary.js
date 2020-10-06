const express = require('express');
const { getTranslation, createWordsPair } = require('../controllers/dictionary.js');
const router = express.Router();

router.post('/', createWordsPair);

router.get('/:word', getTranslation);

module.exports = router;