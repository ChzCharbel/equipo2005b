// Objeto para almacenar la disponibilidad de cada profesor
let availability = {};

// Referencia al modal
const profModal = document.getElementById("profModal");

// Cuando el modal se va a mostrar
profModal.addEventListener("show.bs.modal", function (event) {
  const button = event.relatedTarget; // Botón que abrió el modal
  const profName = button.getAttribute("data-prof-name"); // Nombre del profesor
  document.getElementById("profName").textContent = profName; // Mostrar nombre en el modal

  // Días y horarios disponibles
  const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  const times = [
    "7-00",
    "8-00",
    "9-00",
    "10-00",
    "11-00",
    "12-00",
    "13-00",
    "14-00",
    "15-00",
  ];

  // Obtener la disponibilidad del profesor (o un objeto vacío si no existe)
  const profAvailability = availability[profName] || {};

  // Configurar los checkboxes según la disponibilidad del profesor
  days.forEach((day) => {
    times.forEach((time) => {
      const checkboxId = `${day}-${time}`;
      const checkbox = document.getElementById(checkboxId);
      if (checkbox) {
        // Marcar el checkbox si el horario está en la disponibilidad del profesor
        checkbox.checked =
          profAvailability[day] && profAvailability[day].includes(time);
      }
    });
  });
});

// Cuando se presiona "Aceptar"
document
  .getElementById("saveAvailability")
  .addEventListener("click", function () {
    const profName = document.getElementById("profName").textContent; // Nombre del profesor
    const profAvailability = {}; // Objeto para almacenar la nueva disponibilidad

    // Días y horarios disponibles
    const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
    const times = [
      "7-00",
      "8-00",
      "9-00",
      "10-00",
      "11-00",
      "12-00",
      "13-00",
      "14-00",
      "15-00",
    ];

    // Recolectar los horarios seleccionados
    days.forEach((day) => {
      profAvailability[day] = []; // Inicializar array para el día
      times.forEach((time) => {
        const checkboxId = `${day}-${time}`;
        const checkbox = document.getElementById(checkboxId);
        if (checkbox && checkbox.checked) {
          profAvailability[day].push(time); // Añadir horario seleccionado
        }
      });
      // Si no hay horarios seleccionados para el día, eliminar la entrada
      if (profAvailability[day].length === 0) {
        delete profAvailability[day];
      }
    });

    // Actualizar la disponibilidad solo para este profesor
    availability[profName] = profAvailability;
    console.log(
      `Disponibilidad actualizada para ${profName}:`,
      availability[profName]
    );
  });
