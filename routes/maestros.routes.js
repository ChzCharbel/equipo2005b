const express = require('express');
const router = express.Router();

const maestrosController = require('../controllers/maestros.controller');

// GET /maestros
router.get('/agregar', (request, response, next) => {
    response.render('agregar_maestros');
});

// POST /maestros
router.post('/agregar', (request, response, next) => {
    console.log(request.body);
    maestros.push(request.body.nombre);
    
    const maestros = [];
    response.render('lista_maestros', {
        maestros: maestros,
    });
});

router.get('/', maestrosController.get_all_maestros);

module.exports = router;