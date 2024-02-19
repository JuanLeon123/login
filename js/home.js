document.addEventListener("DOMContentLoaded", function () {
    let buttonLogout = document.getElementById("logOutButton");

    let user = {
        email: localStorage.getItem('email'),
        name: localStorage.getItem('name'),
        login: localStorage.getItem('login-success'),
    };

    if (user.name) {
        document.getElementById("welcome").innerHTML = "Bienvenido(a)! " + user.name;
    }

    console.log('Usuarios', user);

    if (!user.login) {
        window.location.href = "login.html";
    }

    if (buttonLogout) {
        buttonLogout.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.removeItem('login-success');
            window.location.href = "login.html";
        });
    }
});


