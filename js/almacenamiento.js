/**
 * Módulo de Almacenamiento - LocalStorage y JSON
 * Responsable de la persistencia de datos del sistema de videojuegos.
 */

const CLAVE_STORAGE = "sistema_videojuegos_datos";

/**
 * Guarda los datos generales en el LocalStorage de manera segura.
 * @param {Object} datos - Objeto completo con la estructura de videojuegos.
 */
function guardarDatos(datos) {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(datos));
  } catch (error) {
    console.error("Error al guardar en LocalStorage (posible memoria llena):", error);
  }
}

/**
 * Recupera los datos guardados en LocalStorage.
 * @returns {Object|null} Objeto con los datos o null si no existe el registro.
 */
function recuperarDatos() {
  try {
    const texto = localStorage.getItem(CLAVE_STORAGE);
    return texto === null ? null : JSON.parse(texto);
  } catch (error) {
    console.error("Error al leer LocalStorage (JSON dañado o ilegible):", error);
    return null;
  }
}

/**
 * Carga los datos iniciales desde el archivo JSON si el LocalStorage está vacío,
 * evitando sobrescribir los cambios o registros nuevos del usuario.
 * @returns {Promise<Object>} Objeto con la lista de videojuegos.
 */
async function cargarDatosIniciales() {
  let datosActuales = recuperarDatos();
  
  if (datosActuales === null) {
    try {
      const respuesta = await fetch("data/datos-iniciales.json");
      if (!respuesta.ok) {
        throw new Error("No se pudo conectar con el archivo datos-iniciales.json.");
      }
      datosActuales = await respuesta.json();
      guardarDatos(datosActuales);
      console.log("Datos iniciales cargados y guardados en LocalStorage correctamente.");
    } catch (error) {
      console.error("Error cargando los datos iniciales:", error);
      datosActuales = { videojuegos: [] };
    }
  }
  return datosActuales;
}

/**
 * Obtiene únicamente el array de videojuegos.
 * @returns {Promise<Array>} Lista de videojuegos.
 */
async function obtenerVideojuegos() {
  const datos = await cargarDatosIniciales();
  return datos.videojuegos || [];
}

/**
 * Recibe una lista actualizada de videojuegos y la almacena en el sistema.
 * @param {Array} listaVideojuegos - Array actualizado con los videojuegos.
 */
async function guardarVideojuegos(listaVideojuegos) {
  const datos = { videojuegos: listaVideojuegos };
  guardarDatos(datos);
}