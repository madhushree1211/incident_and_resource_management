const express = require('express');
const {
  getIncidents,
  getIncident,
  createIncident,
  updateIncident,
  deleteIncident,
  assignIncident,
  resolveIncident
} = require('../controllers/incidentController');
const { validate, schemas } = require('../middleware/validate');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', getIncidents);
router.get('/:id', getIncident);
router.post('/', validate(schemas.incidentSchema), createIncident);
router.put('/:id', validate(schemas.incidentSchema), updateIncident);
router.delete('/:id', deleteIncident);
router.put('/:id/assign', authorize('admin'), assignIncident);
router.put('/:id/resolve', authorize('admin', 'technician'), resolveIncident);

module.exports = router;
