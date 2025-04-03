const express = require('express');
const router = express.Router();

const isAuth = require('../util/is-auth');
const canView = require('../util/canViewOfertaAcademica');
const canRegister = require('../util/canRegisterOfertaAcademica');

const ofertaController = require('../controllers/oferta.controller');


router.get('/:idCiclo/agregar', isAuth, canRegister, ofertaController.get_agregar);
router.get('/:idCiclo', isAuth, canView, ofertaController.get_oferta);

module.exports = router;