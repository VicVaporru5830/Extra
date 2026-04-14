const express = require('express');
const router = express.Router();
const { obtenerClima } = require('../controllers/climaController');

router.get('/', obtenerClima);

module.exports = router;
