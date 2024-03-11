const express = require('express');
const { SearchProperty } = require('../Controllers/search');
const router = express.Router();

router.get('/search', SearchProperty)

module.exports = router;
