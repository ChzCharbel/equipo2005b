const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewOfertaAcademica');

const ofertaController = require('../controllers/oferta.controller')

router.get('/', isAuth, canView, ofertaController.get_oferta);

module.exports = router;