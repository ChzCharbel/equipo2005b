const express = require('express');
const router = express.Router();

const alumnosController = require('../controllers/alumnos.controller');

router.get('/regulares', alumnosController.get_horario_alumnos_regulares);
router.get('/irregulares', alumnosController.get_horario_alumnos_regulares);
router.get('/', alumnosController.get_alumnos);

module.exports = router;