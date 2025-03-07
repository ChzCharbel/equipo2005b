const express = require('express');
const app = express();
const path = require("path");
const PORT = 3000;
const router = express.Router();

const materiasRoutes = require('./routes/materias.routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.use("/materias", materiasRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});