document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");


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

loginButton.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    let usuarioIndex = usuarios.findIndex(usuario => usuario.emailValue === email && usuario.passwordValue === password);

    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].login_success = true;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        Swal.fire({
            icon: "success",
            title: "Login exitoso",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            window.location.href = "./pages/home.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "El correo electrónico o la contraseña son incorrectos.",
        });
    }
});
