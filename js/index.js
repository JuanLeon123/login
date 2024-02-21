document.addEventListener("DOMContentLoaded", function () {
    checkLocalStorage();
});

window.addEventListener('storage', function (usuarios) {
    this.window.location.reload();
});

function checkLocalStorage() {
    if (localStorage.length === 0) {
        window.location.href = "../pages/login.html";
    } else {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        for (let usuario of usuarios) {
            if (usuario.login_success === true) {
                loginSuccess = true;
                break;
            } else {
                window.location.href = "../pages/login.html";
            }
        }
    }
}

function cerrarSesion() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let usuarioIndex = usuarios.findIndex(usuario => usuario.login_success === true);

    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].login_success = false;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    window.location.href = "../pages/login.html";
}






