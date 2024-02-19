document.addEventListener("DOMContentLoaded", function () {
    let emailValueLoginForm = document.getElementById("emailLogin");
    let passwordValueLoginForm = document.getElementById("passwordLogin");
    let loginButton = document.getElementById("loginButton");

    if (loginButton) {
        loginButton.addEventListener("click", function (event) {
            event.preventDefault();
            let emailValueLoginFormValue = emailValueLoginForm.value.trim();
            let passwordValueLoginFormValue = passwordValueLoginForm.value.trim();

            let emailValueLoginLocal = localStorage.getItem("email");
            let NameValueLoginLocal = localStorage.getItem("name");
            let passwordValueLoginLocal = localStorage.getItem("password");

            let user = {
                emailValueLoginLocal,
                NameValueLoginLocal,
                passwordValueLoginLocal
            };

            if (emailValueLoginFormValue === emailValueLoginLocal && passwordValueLoginFormValue === passwordValueLoginLocal) {
                Swal.fire({
                    icon: "success",
                    title: "Te has iniciado sesión correctamente.",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    localStorage.setItem('login-success', true);
                    window.location.href = "home.html";
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al iniciar sesión",
                    text: "El correo electrónico o la contraseña son incorrectos.",
                });
            }
        });
    }
    document.querySelector('.toggle-password').addEventListener('click', function () {
        const passwordInput = document.getElementById("passwordLogin");
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            document.getElementsByClassName("toggle-password")[0].classList.remove("fa-eye");
            document.getElementsByClassName("toggle-password")[0].classList.add("fa-eye-slash");
        } else {
            passwordInput.type = 'password';
            document.getElementsByClassName("toggle-password")[0].classList.remove("fa-eye-slash");
            document.getElementsByClassName("toggle-password")[0].classList.add("fa-eye");
        }
    });
});
