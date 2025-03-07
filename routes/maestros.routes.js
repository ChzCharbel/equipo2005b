const express = require('express');
const router = express.Router();

const maestros = [];

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