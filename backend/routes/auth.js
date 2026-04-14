const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { validate, schemas } = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', validate(schemas.authRegisterSchema), register);
router.post('/login', validate(schemas.authLoginSchema), login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
