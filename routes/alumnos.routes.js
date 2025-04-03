const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canViewAll = require('../util/canViewAlumnos');
const canViewSelf = require('../util/canViewAssignedGroups');

const alumnosController = require('../controllers/alumnos.controller');

router.get('/regulares', isAuth, canViewSelf, alumnosController.get_horario_alumnos_regulares);
router.get('/irregulares', isAuth, canViewSelf, alumnosController.get_horario_alumnos_regulares);
router.get('/buscar/:nombre', isAuth, canViewAll, alumnosController.get_buscar);
router.get('/', isAuth, canViewAll, alumnosController.get_alumnos);



module.exports = router;