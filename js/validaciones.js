// Rango de año elegido: desde 1950 hasta el año actual + 1.
const ANIO_MINIMO = 1950;
const ANIO_MAXIMO = new Date().getFullYear() + 1;

function validarNombre(nombre) {
  if (typeof nombre !== "string" || nombre.trim() === "") {
    return "El nombre del videojuego es obligatorio.";
  }
  return null;
}

function validarAnio(anio) {
  if (anio === "" || anio === null || anio === undefined) {
    return "El año de lanzamiento es obligatorio.";
  }
  const numero = Number(anio);
  if (!Number.isInteger(numero) || numero < ANIO_MINIMO || numero > ANIO_MAXIMO) {
    return `El año debe ser un número entero entre ${ANIO_MINIMO} y ${ANIO_MAXIMO}.`;
  }
  return null;
}
function validarCamposObligatorios(datos) {
  if (!datos || typeof datos !== "object") {
    return "Los datos del videojuego son obligatorios.";
  }
  if (!datos.nombre || String(datos.nombre).trim() === "") {
    return "Completá el nombre del videojuego.";
  }
  if (!datos.plataforma || String(datos.plataforma).trim() === "") {
    return "Seleccioná o completá la plataforma.";
  }
  if (!datos.genero || String(datos.genero).trim() === "") {
    return "Seleccioná o completá el género.";
  }
  if (datos.anio === "" || datos.anio === null || datos.anio === undefined) {
    return "Completá el año de lanzamiento.";
  }
  return null;
}

function validarVideojuego(datos) {
  const errorObligatorio = validarCamposObligatorios(datos);
  if (errorObligatorio) {
    return errorObligatorio;
  }
  const errorNombre = validarNombre(datos.nombre);
  if (errorNombre) {
    return errorNombre;
  }
  const errorAnio = validarAnio(datos.anio);
  if (errorAnio) {
    return errorAnio;
  }
  return null;
}