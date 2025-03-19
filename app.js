const express = require('express');
const app = express();

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

const alumnosRoutes = require('./routes/alumnos.routes');
app.use(alumnosRoutes);

const maestrosRoutes = require('./routes/maestros.routes');
app.use(maestrosRoutes);

const materiasRoutes = require('./routes/materias.routes');
app.use(materiasRoutes);

app.use((request, response, next) => {
    console.log('Último middleware');
    
    //Manda la respuesta
    //response.statusCode = 404;
    response.send('Último middleware'); 
});

app.listen(3000);
