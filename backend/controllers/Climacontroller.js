const axios = require('axios');

async function obtenerClima(req, res) {
  try {
    const { lat, lon } = req.query;

    // Geocodificación inversa
    const geoResp = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const ciudad = geoResp.data.address.city || geoResp.data.address.town || "Desconocido";

    // Clima
    const climaResp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric&lang=es`);
    const { temp, humidity } = climaResp.data.main;
    const condicion = climaResp.data.weather[0].description;

    res.json({
      ciudad,
      temperatura: temp,
      humedad: humidity,
      condicion
    });
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo datos" });
  }
}

module.exports = { obtenerClima };
