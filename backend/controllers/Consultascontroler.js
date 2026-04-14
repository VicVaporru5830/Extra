const fs = require('fs');
const path = require('path');
const archivo = path.join(__dirname, '../consultas.json');

function guardarConsulta(req, res) {
  const { ciudad, temperatura, fecha } = req.body;
  const consulta = { ciudad, temperatura, fecha, id: Date.now() };

  let consultas = [];
  if (fs.existsSync(archivo)) {
    consultas = JSON.parse(fs.readFileSync(archivo, 'utf8'));
  }

  consultas.push(consulta);
  fs.writeFileSync(archivo, JSON.stringify(consultas, null, 2));

  res.json({ mensaje: 'Consulta guardada', id: consulta.id });
}

function listarConsultas(req, res) {
  if (!fs.existsSync(archivo)) {
    return res.json([]);
  }
  const consultas = JSON.parse(fs.readFileSync(archivo, 'utf8'));
  res.json(consultas);
}

module.exports = { guardarConsulta, listarConsultas };
