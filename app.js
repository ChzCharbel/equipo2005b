document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("mostrarInput").addEventListener("click", function() {
        let form = document.getElementById("formulario");
        form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";
    });
});
