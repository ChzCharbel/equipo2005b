const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewMaterias.js'); // Ajusta esto si tienes un middleware específico para grupos 

const materiasController = require('../controllers/materias.controller.js');

// Ruta para obtener grupos (opcional)
router.get('/', isAuth, canView, materiasController.get_materias);

// Ruta para guardar/actualizar un grupo
router.post('/guardar-grupo', materiasController.save_grupo);


module.exports = router;