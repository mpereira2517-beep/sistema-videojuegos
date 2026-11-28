const CLAVE_CATALOGO = "catalogo_videojuegos";

function obtenerCatalogo() {
  const raw = localStorage.getItem(CLAVE_CATALOGO);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function guardarCatalogo(lista) {
  localStorage.setItem(CLAVE_CATALOGO, JSON.stringify(lista));
}

function generarId(listaActual = obtenerCatalogo()) {
  const maxId = listaActual.reduce((max, item) => {
    const num = Number(item && item.id);
    return Number.isFinite(num) && num > max ? num : max;
  }, 0);
  return maxId + 1;
}

function agregarVideojuego(datos) {
  if (typeof validarVideojuego === "function") {
    const errorValidacion = validarVideojuego(datos);
    if (errorValidacion) {
      return { ok: false, error: errorValidacion };
    }
  }

  const catalogo = obtenerCatalogo();
  const nuevoJuego = {
    id: generarId(catalogo),
    nombre: String(datos.nombre).trim(),
    plataforma: String(datos.plataforma).trim(),
    genero: String(datos.genero).trim(),
    anio: Number(datos.anio)
  };

  catalogo.push(nuevoJuego);
  guardarCatalogo(catalogo);

  return { ok: true, juego: nuevoJuego };
}