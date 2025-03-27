const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewAlumnos');

const alumnosController = require('../controllers/alumnos.controller');

router.get('/regulares', isAuth, canView, alumnosController.get_horario_alumnos_regulares);
router.get('/irregulares', isAuth, canView, alumnosController.get_horario_alumnos_regulares);
router.get('/', isAuth, canView, alumnosController.get_alumnos);

module.exports = router;