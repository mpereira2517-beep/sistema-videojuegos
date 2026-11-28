/* ===== interfaz.js: lo que se ve y se toca ===== */

let elementoQueAbrio = null; // para devolver el foco al cerrar una ventana

/* Abre un formulario/ventana por su id */
function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  elementoQueAbrio = document.activeElement;
  modal.showModal(); // el navegador cierra con Esc y mantiene el foco adentro
}

/* Cierra la ventana y devuelve el foco a quien la abrió */
function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.close();
  if (elementoQueAbrio) elementoQueAbrio.focus();
}

/* Muestra un aviso. tipo: "error", "exito" o "aviso" */
function mostrarMensaje(texto, tipo = "aviso") {
  const zona = document.getElementById("zona-mensajes");
  if (!zona) return;

  const mensaje = document.createElement("div");
  mensaje.className = "mensaje mensaje-" + tipo;
  mensaje.textContent = texto;
  zona.appendChild(mensaje);

  // Se borra solo: los errores quedan más tiempo
  const duracion = tipo === "error" ? 8000 : 5000;
  setTimeout(() => mensaje.remove(), duracion);
}

/* Cambia de pantalla y marca la opción activa en la navegación */
function mostrarPantalla(nombre) {
  document.querySelectorAll(".pantalla").forEach((pantalla) => {
    pantalla.hidden = pantalla.id !== "pantalla-" + nombre;
  });
  document.querySelectorAll(".nav-boton").forEach((boton) => {
    boton.classList.toggle("activo", boton.dataset.pantalla === nombre);
  });
}

/* Muestra u oculta los botones de administrador según el rol */
function actualizarSegunRol() {
  let esAdmin;
  if (typeof puedeAdministrar === "function") {
    esAdmin = puedeAdministrar(); // función de Atu (usuarios.js)
  } else {
    // Mientras Atu no la termine, usamos el selector directamente
    esAdmin = document.getElementById("selector-rol").value === "administrador";
  }
  document.querySelectorAll("[data-solo-admin]").forEach((elemento) => {
    elemento.hidden = !esAdmin;
  });
}

/* Conecta los botones con las funciones de arriba */
function iniciarInterfaz() {
  document.querySelectorAll(".nav-boton").forEach((boton) => {
    boton.addEventListener("click", () => mostrarPantalla(boton.dataset.pantalla));
  });

  document.getElementById("selector-rol").addEventListener("change", (evento) => {
    if (typeof cambiarRol === "function") cambiarRol(evento.target.value); // función de Atu
    actualizarSegunRol();
  });

  document.getElementById("boton-agregar").addEventListener("click", () => {
    abrirModal("modal-videojuego");
  });

  document.getElementById("boton-cancelar").addEventListener("click", () => {
    cerrarModal("modal-videojuego");
  });

  actualizarSegunRol();
}

iniciarInterfaz();