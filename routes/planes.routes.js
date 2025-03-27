const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewPlanes');

const planesController = require('../controllers/planes.controller');

router.get('/', isAuth, canView, planesController.get_planes);

module.exports = router;