const express = require('express');
const app = express();

const db= require('./util/database.js');
const {getUserById, getUserGroups, getAcademicHistory} = require('./util/admin.api.client');

const path = require('path');

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); 

const session = require('express-session');

app.use(session({
    secret: 'string secreto',
    resave: false,
    saveUninitialized: false,
}));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

const usersRoutes = require('./routes/users.routes');
app.use('/users', usersRoutes); 

app.get('/v1/users/find_one/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id)
        res.send(user)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error fetching user')
    }
})


app.get('/v1/school_cycles/user_groups_index/:cycle_id/:user_ivd_id',
    async (req, res) => {
    try {
        const userGroups = await getUserGroups(
        req.params.cycle_id,
        req.params.user_ivd_id,
        )
        res.send(userGroups)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error fetching user')
        }
    },
)

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
    },
)

const alumnosRoutes = require('./routes/alumnos.routes');
app.use(alumnosRoutes);

const maestrosRoutes = require('./routes/maestros.routes');
app.use(maestrosRoutes);

const materiasRoutes = require('./routes/materias.routes');
app.use(materiasRoutes);

const planesRoutes = require('./routes/planes.routes');
app.use(planesRoutes);

app.use((request, response, next) => {
    console.log('Último middleware');
    
    //Manda la respuesta
    //response.statusCode = 404;
    response.send('Último middleware'); 
});

app.listen(3000);
