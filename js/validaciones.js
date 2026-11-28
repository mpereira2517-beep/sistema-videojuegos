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