const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');

const app = express();

// Importaciones de utilidades y rutas
const {getUserById, getUserGroups, getAcademicHistory} = require('./util/admin.api.client');

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); 

// Importante: añadir cookieParser ANTES de la sesión y CSRF
app.use(cookieParser());

app.use(session({
    secret: 'string secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    }
}));

// Parsers
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CSRF Protection - IMPORTANTE: DESPUÉS de los parsers y sesión
const csrfProtection = csrf({ cookie: true }); 

// Middleware para pasar token a todas las vistas
app.use((req, res, next) => {
    // Asegúrate de que req.csrfToken existe antes de asignarlo
    if (req.csrfToken) {
        res.locals.csrfToken = req.csrfToken();
    }
    next();
});

// Aplicar protección CSRF
app.use(csrfProtection);

// Manejador de errores de CSRF
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    
    res.status(403);
    res.send('Sesión inválida o token CSRF incorrecto');
});

// Middleware para pasar token CSRF a todas las vistas
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Aplicar protección CSRF
app.use(csrfProtection);

// Rutas de usuarios
const usersRoutes = require('./routes/users.routes');
app.use('/users', usersRoutes); 

// Rutas de API para usuarios
app.get('/v1/users/find_one/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
});

app.get('/v1/school_cycles/user_groups_index/:cycle_id/:user_ivd_id',
    async (req, res) => {
    try {
        const userGroups = await getUserGroups(
            req.params.cycle_id,
            req.params.user_ivd_id,
        );
        res.send(userGroups);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user');
    }
});

app.get('/v1/students/academic_history/:ivd_id',
    async (req, res) => {
    try {
        const userGroups = await getAcademicHistory(
        req.params.ivd_id,
        )
        res.send(userGroups)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error fetching user')
    }
});

// Importar y usar rutas adicionales
const alumnosRoutes = require('./routes/alumnos.routes');
app.use('/alumnos', alumnosRoutes);

const inicioRoutes = require('./routes/inicio.routes');
app.use('/inicio', inicioRoutes);

const maestrosRoutes = require('./routes/maestros.routes');
app.use('/maestros', maestrosRoutes);

const materiasRoutes = require('./routes/materias.routes');
app.use('/materias', materiasRoutes);

const planesRoutes = require('./routes/planes.routes');
app.use('/planes', planesRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});