const express = require('express');
const router = express.Router();

const gruposController = require('../controllers/grupos.controller.js');

router.get('/', gruposController.get_grupos);
router.post('/editarGrupo/:id', gruposController.editarGrupo);

module.exports = router;