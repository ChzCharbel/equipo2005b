const express = require('express');
const router = express.Router();
const { asignarProfesorSalon } = require('../controllers/asignaciones.controller');

router.post('/asignar', asignarProfesorSalon);

module.exports = router;