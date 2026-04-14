const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const climaRoutes = require('./routes/clima');
const consultasRoutes = require('./routes/consultas');

const app = express();
app.use(bodyParser.json());

// Rutas
app.use('/clima', climaRoutes);
app.use('/consultas', consultasRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
