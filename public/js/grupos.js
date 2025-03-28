document.addEventListener("DOMContentLoaded", function () {
    const saveChangesBtn = document.getElementById("saveChangesBtn");

    if (saveChangesBtn) {
        saveChangesBtn.addEventListener("click", async function () {
            // Obtener valores del formulario
            const profesor = document.getElementById("profesorSelect").value;
            const salon = document.getElementById("salonSelect").value;

            // Verificar si el campo _csrf está presente en el HTML
            const csrfTokenInput = document.querySelector("input[name='_csrf']");
            if (!csrfTokenInput) {
                console.error("Error: No se encontró el token CSRF en el formulario.");
                return;
            }

            const csrfToken = csrfTokenInput.value; // Obtener el valor del token

            // Validar que todos los campos estén completos
            if (!profesor || !salon) {
                alert("Todos los campos son obligatorios");
                return;
            }

            try {
                // Enviar la solicitud POST con fetch
                const response = await fetch("/guardar-grupo", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "CSRF-Token": csrfToken // Incluir el token CSRF en los headers
                    },
                    body: JSON.stringify({ grupoId, profesor, salon })
                });

                const data = await response.json();

                if (response.ok) {
                    // Mostrar mensaje de éxito
                    document.getElementById("successAlert").style.display = "block";

                    // Cerrar el modal después de un breve retraso
                    setTimeout(() => {
                        document.getElementById("successAlert").style.display = "none";
                        const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
                        modal.hide();
                    }, 2000);
                } else {
                    alert("Error: " + data.message);
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                alert("Hubo un problema al guardar los cambios.");
            }
        });
    }
});
