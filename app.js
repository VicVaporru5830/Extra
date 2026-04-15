document.getElementById("btnClima").addEventListener("click", obtenerClima);

async function obtenerClima() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const res = await fetch("https://extra-0hhv.onrender.com/clima", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ lat, lon })
});

    const data = await res.json();

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