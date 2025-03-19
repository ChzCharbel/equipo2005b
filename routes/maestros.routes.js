const express = require('express');
const router = express.Router();

const maestrosController = require('../controllers/maestros.controller');

const maestros = [];

router.get('/allmaestros', maestrosController.get_all_maestros);

// GET /maestros
router.get('/maestros', (request, response, next) => {
    response.render('agregar_maestros');
    });

// POST /maestros
router.post('/maestros', (request, response, next) => {
    console.log(request.body);
    maestros.push(request.body.nombre);

    response.render('lista_maestros', {
        maestros: maestros
    });
});


module.exports = router;