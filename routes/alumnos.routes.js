const express = require('express');
const router = express.Router();

const alumnosController = require('../controllers/alumnos.controller');

router.get('/alumnosregulares', alumnosController.get_horario_alumnos_regulares);

router.get('/alumnos', alumnosController.get_alumnos);

router.get('/alumnosirregulares', alumnosController.get_horario_alumnos_regulares);

module.exports = router;