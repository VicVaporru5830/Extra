document.getElementById("btnClima").addEventListener("click", obtenerClima);

async function obtenerClima() {
  navigator.geolocation.getCurrentPosition(async (pos) => {

    // ✅ DEFINIR lat y lon
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    // ✅ LLAMAR SOLO A RENDER
    const res = await fetch("https://extra-0hhv.onrender.com/clima", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lat, lon })
    });

    const data = await res.json();

    // ✅ MANEJO DE ERROR
    if (!data || !data.condicion) {
      document.getElementById("resultado").innerHTML =
        "<p>Error al obtener el clima</p>";
      return;
    }

    let imagen = "castform-normal.png";

    if (data.condicion.includes("lluvia")) {
      imagen = "castform-rain.png";
    } else if (data.condicion.includes("cielo despejado")) {
      imagen = "castform-sunny.png";
    } else if (data.condicion.includes("nieve")) {
      imagen = "castform-snow.png";
    }

    document.getElementById("resultado").innerHTML = `
      <h2>${data.ciudad}</h2>
      <img src="img/${imagen}" alt="Castform clima">
      <p>🌡️ ${data.temperatura} °C</p>
      <p>💧 Humedad: ${data.humedad}%</p>
      <p>☁️ ${data.condicion}</p>
    `;
  });
}