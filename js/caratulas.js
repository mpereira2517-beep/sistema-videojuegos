
/**
 * Módulo de gestión de carátulas de videojuegos.
 * Permite seleccionar, validar y previsualizar imágenes.
 */

// Formatos de imagen permitidos.
const FORMATOS_IMAGEN_PERMITIDOS = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

// Tamaño máximo permitido: 500 KB.
const TAMANO_MAXIMO_IMAGEN = 500 * 1024;

/**
 * Comprueba si una imagen cumple los requisitos.
 * @param {File} archivo - Imagen seleccionada por el usuario.
 * @returns {Object} Resultado de la validación y mensaje.
 */
function validarImagen(archivo) {

    if (!archivo) {
        return {
            valido: false,
            mensaje: "No se seleccionó ninguna imagen."
        };
    }

    // Comprobar el formato.
    if (!FORMATOS_IMAGEN_PERMITIDOS.includes(archivo.type)) {
        return {
            valido: false,
            mensaje: "Formato no permitido. Utilizá JPG, PNG o WEBP."
        };
    }

    // Comprobar el tamaño.
    if (archivo.size > TAMANO_MAXIMO_IMAGEN) {
        return {
            valido: false,
            mensaje: "La imagen supera el límite de 500 KB."
        };
    }

    return {
        valido: true,
        mensaje: "La imagen es válida."
    };
}
