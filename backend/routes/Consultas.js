const express = require('express');
const router = express.Router();
const { guardarConsulta, listarConsultas } = require('../controllers/consultasController');

router.post('/', guardarConsulta);
router.get('/', listarConsultas);

module.exports = router;
