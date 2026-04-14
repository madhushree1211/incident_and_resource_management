const express = require('express');
const { getLogs } = require('../controllers/logController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.get('/', authorize('admin'), getLogs);

module.exports = router;
