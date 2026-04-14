const express = require('express');
const { getResources, getResource, createResource, updateResource, deleteResource } = require('../controllers/resourceController');
const { validate, schemas } = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getResources);
router.get('/:id', protect, getResource);
router.post('/', protect, authorize('admin'), validate(schemas.resourceSchema), createResource);
router.put('/:id', protect, authorize('admin'), validate(schemas.resourceSchema), updateResource);
router.delete('/:id', protect, authorize('admin'), deleteResource);

module.exports = router;
