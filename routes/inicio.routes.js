const express = require('express');
const router = express.Router();
const inicioController = require('../controllers/inicio.controller');

router.get('/',inicioController.get_inicio); 

module.exports = router;