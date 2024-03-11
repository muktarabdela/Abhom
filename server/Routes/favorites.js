const express = require('express');
const { saveFavoriteProperty,
    getFavoritePropertyById,
    getFavoriteProperties, deleteFavoritePropertyById } = require('../Controllers/favorites');
const router = express.Router();

router.post('/favourites/:id', saveFavoriteProperty);
router.get('/favourites/:id', getFavoritePropertyById);
router.delete('/favourites/:id', deleteFavoritePropertyById);
router.get('/favourites', getFavoriteProperties);

module.exports = router;
