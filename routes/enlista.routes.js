const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewAssignedGroups');

const enlistaController = require('../controllers/enlista.controller');

router.get('/alumno/:idCiclo', isAuth, canView, enlistaController.get_enlista);

module.exports = router;