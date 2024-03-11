const express = require('express');
const { AddProperty, PropertyListings, UpdateProperty, DeleteProperty } = require('../Controllers/properties');
const router = express.Router();

router.route('/properties').post(AddProperty).get(PropertyListings)
router.route('/properties/:id').patch(UpdateProperty).delete(DeleteProperty)

module.exports = router;