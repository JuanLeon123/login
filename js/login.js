document.addEventListener("DOMContentLoaded", function () {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});

const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');

function toggleForms() {
    if (getComputedStyle(registerForm).display === 'none') {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const submitButton = document.getElementById("buttonSubmit");

const stringLenght = document.getElementById("stringLenght");
const upperCase = document.getElementById("upperCase");
const number = document.getElementById("number");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const stringLenghtPass = /^.{6,}$/;
const UpperCasePass = /^(?=.*[A-Z])/;
const NumberPass = /^(?=.*\d)/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

const form = document.getElementById('register-form');
form.addEventListener('submit', submitForm);

const formLogin = document.getElementById("login-form");
formLogin.addEventListener("submit", login);


emailInput.addEventListener("input", function () {
    let emailValue = emailInput.value.trim();
    if (!emailRegex.test(emailValue)) {
        emailInput.classList.add("is-invalid");
    } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
    }
});

nameInput.addEventListener("input", function () {
    let nameValue = nameInput.value.trim();
    if (nameValue.length < 4) {
        nameInput.classList.add("is-invalid");
    } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
    }
});
passwordInput.addEventListener("input", function () {
    let passwordValue = passwordInput.value.trim();
    if (stringLenghtPass.test(passwordValue)) {
        stringLenght.classList.remove("text-danger");
        stringLenght.classList.add("text-success");
        passwordInput.classList.add("is-invalid");
    } else {
        stringLenght.classList.remove("text-success");
        stringLenght.classList.add("text-danger");
    } if (UpperCasePass.test(passwordValue)) {
        upperCase.classList.remove("text-danger");
        upperCase.classList.add("text-success");
        passwordInput.classList.add("is-invalid");
    } else {
        upperCase.classList.remove("text-success");
        upperCase.classList.add("text-danger");
    } if (NumberPass.test(passwordValue)) {
        number.classList.remove("text-danger");
        number.classList.add("text-success");
        passwordInput.classList.add("is-invalid");
    } else {
        number.classList.remove("text-success");
        number.classList.add("text-danger");
        passwordInput.classList.remove("is-invalid");
    } if (!passwordRegex.test(passwordValue)) {
        passwordInput.classList.add("is-invalid");
    } else {
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
    } if (passwordValue === "") {
        passwordInput.classList.add("is-invalid");
    } else {

    }
});

confirmPasswordInput.addEventListener("input", function () {
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();

    if (passwordValue !== confirmPasswordValue) {
        confirmPasswordInput.classList.add("is-invalid");
    } else {
        confirmPasswordInput.classList.remove("is-invalid");
        confirmPasswordInput.classList.add("is-valid");
    }
});

function submitForm(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (email === "" || name === "" || password === "" || confirmPassword === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hay campos vacíos, verifica todos los campos.",
        });
        return;
    } else if (!passwordRegex.test(password)) {
        Swal.fire({
            icon: "error",
            title: "Contraseña no válida",
            text: "La contraseña debe tener al menos 6 caracteres, incluir al menos una letra mayúscula y un número.",
        });
        return;
    } else if (password !== confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Las contraseñas no coinciden.",
        });
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuarios.some(usuario => usuario.email === email);
    if (usuarioExistente) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ya existe una cuenta con este correo electrónico.",
        });
    } else {
        let nuevoUsuario = { email, name, password, login_success: false };
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Te has registrado correctamente.",
            showConfirmButton: false,
            timer: 3000
        }).then(() => {
            document.getElementById("register-form").reset();
            toggleForms();
        });
    }
}

function passwordVisibility(passwordInputId, toggleButtonId) {
    const passwordInput = document.getElementById(passwordInputId);
    const passwordButton = document.getElementById(toggleButtonId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordButton.classList.remove("fa-eye");
        passwordButton.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = 'password';
        passwordButton.classList.remove("fa-eye-slash");
        passwordButton.classList.add("fa-eye");
    }
}

document.getElementById('passwordButton').addEventListener('click', function () {
    passwordVisibility('password', 'passwordButton');
});

document.getElementById('confirmPasswordButton').addEventListener('click', function () {
    passwordVisibility('confirmPassword', 'confirmPasswordButton');
});


document.querySelector('.toggle-password-login').addEventListener('click', function () {
    const passwordInput = document.getElementById("passwordLogin");
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        document.getElementsByClassName("toggle-password-login")[0].classList.remove("fa-eye");
        document.getElementsByClassName("toggle-password-login")[0].classList.add("fa-eye-slash");
    } else {
        passwordInput.type = 'password';
        document.getElementsByClassName("toggle-password-login")[0].classList.remove("fa-eye-slash");
        document.getElementsByClassName("toggle-password-login")[0].classList.add("fa-eye");
    }
});

document.getElementById("loginButton").addEventListener("click", function (event) {
    event.preventDefault();
    login();
});

function login() {
    const email = document.getElementById("emailLogin").value.trim();
    const password = document.getElementById("passwordLogin").value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    let usuarioIndex = usuarios.findIndex(usuario => usuario.email === email && usuario.password === password);

    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].login_success = true;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        Swal.fire({
            icon: "success",
            title: "Login exitoso",
            showConfirmButton: false,
            timer: 3000
        }).then(() => {
            window.location.href = "../index.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "El correo electrónico o la contraseña son incorrectos.",
        });
    }
}


