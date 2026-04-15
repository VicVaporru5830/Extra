# Aplicación Web de Geolocalización y Clima

Proyecto desarrollado para la asignatura **Aplicaciones Web Orientadas a Servicios**.

## 📌 Descripción
Aplicación web que obtiene la ubicación del usuario, consume APIs de terceros para mostrar información climática y expone una API propia para registrar consultas, aplicando arquitectura orientada a servicios (SOA).

---

## 🎯 Objetivo
- Consumir servicios web de terceros
- Implementar una API REST propia
- Aplicar principios SOA
- Desarrollar una aplicación web funcional

---

## 🏗️ Arquitectura SOA

**Capas:**
- **Capa de acceso:** Navegador (HTML, CSS, JavaScript)
- **Capa de procesos:** Backend Node.js + Express
- **Capa de servicios:** 
  - API de geolocalización (Browser)
  - API de OpenStreetMap (Nominatim)
  - API de OpenWeatherMap
  - API propia (/consultas)
- **Capa de recursos:** Archivo `consultas.json`

---

## 🖥️ Tecnologías utilizadas

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Comunicación: REST
- Formato de datos: JSON
- Pruebas: Postman
- Control de versiones: Git y GitHub
- Despliegue: Render

---

## 🔌 APIs utilizadas

- OpenWeatherMap: https://openweathermap.org/api
- OpenStreetMap Nominatim: https://nominatim.org
- API de Geolocalización del navegador

---

## ⚙️ Instalación y ejecución

### Backend
```bash
cd backend
npm install
node server.js