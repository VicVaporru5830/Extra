// ================== IMPORTS ==================
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

// ================== CONFIGURACIÓN ==================
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ================== ENDPOINT DE PRUEBA ==================
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// ================== ENDPOINT CLIMA ==================
app.post("/clima", async (req, res) => {
  const { lat, lon } = req.body;

  if (lat === undefined || lon === undefined) {
    return res.status(400).json({
      error: "Latitud y longitud requeridas"
    });
  }

  try {
    // 1️⃣ Geocodificación inversa (OpenStreetMap)
    const geoResponse = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          lat,
          lon,
          format: "json"
        },
        headers: {
          "User-Agent": "extra-geoclima-app"
        },
        timeout: 10000
      }
    );

    const ciudad =
      geoResponse.data?.address?.city ||
      geoResponse.data?.address?.town ||
      geoResponse.data?.address?.village ||
      "Ubicación desconocida";

    // 2️⃣ Clima (OpenWeatherMap) 👉 USANDO LAT/LON (ESTABLE)
    const weatherResponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          units: "metric",
          lang: "es",
          appid: process.env.API_KEY
        },
        timeout: 10000
      }
    );

    res.json({
      ciudad,
      temperatura: weatherResponse.data.main.temp,
      humedad: weatherResponse.data.main.humidity,
      condicion: weatherResponse.data.weather[0].description
    });

  } catch (error) {
    console.error("ERROR CLIMA:", error.message);
    res.status(500).json({
      error: "Error al obtener información del clima"
    });
  }
});

// ================== API PROPIA: GUARDAR CONSULTA ==================
app.post("/consultas", (req, res) => {
  const { ciudad, temperatura } = req.body;

  if (!ciudad || temperatura === undefined) {
    return res.status(400).json({
      error: "Datos incompletos"
    });
  }

  const nuevaConsulta = {
    id: Date.now(),
    ciudad,
    temperatura,
    fecha_hora: new Date().toISOString()
  };

  try {
    const data = fs.existsSync("consultas.json")
      ? JSON.parse(fs.readFileSync("consultas.json", "utf8"))
      : [];

    data.push(nuevaConsulta);

    fs.writeFileSync("consultas.json", JSON.stringify(data, null, 2));
    res.json({ mensaje: "Consulta guardada" });

  } catch (error) {
    console.error("ERROR CONSULTAS:", error.message);
    res.status(500).json({
      error: "Error al guardar la consulta"
    });
  }
});

// ================== API PROPIA: LISTAR CONSULTAS ==================
app.get("/consultas", (req, res) => {
  try {
    const data = fs.existsSync("consultas.json")
      ? JSON.parse(fs.readFileSync("consultas.json", "utf8"))
      : [];

    res.json(data);
  } catch (error) {
    console.error("ERROR LISTAR CONSULTAS:", error.message);
    res.status(500).json({
      error: "Error al leer las consultas"
    });
  }
});

// ================== PUERTO (RENDER COMPATIBLE) ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});