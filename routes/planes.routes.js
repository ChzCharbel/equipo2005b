const express = require('express');
const router = express.Router();

const planesController = require('../controllers/planes.controller');

router.get('/plan', planesController.get_planes);

module.exports = router;