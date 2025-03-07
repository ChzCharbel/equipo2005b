const express = require("express");
const router = express.Router();
const path = require("path");


router.get("/", (req, res) => {
  res.sendFile(
    "C:\\Users\\charb\\OneDrive\\Documentos\\ITESM\\Coding\\construccion de software\\laboratorios\\equipo2005b\\views\\materias.html"
  );
});

module.exports = router;
