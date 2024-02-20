document.addEventListener("DOMContentLoaded", function () {
    let emailInput = document.getElementById("email");
    let nameInput = document.getElementById("name");
    let passwordInput = document.getElementById("password");
    let confirmPasswordInput = document.getElementById("confirmPassword");
    let submitButton = document.getElementById("buttonSubmit");

    let stringLenght = document.getElementById("stringLenght");
    let upperCase = document.getElementById("upperCase");
    let number = document.getElementById("number");

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let stringLenghtPass = /^.{6,}$/;
    let UpperCasePass = /^(?=.*[A-Z])/;
    let NumberPass = /^(?=.*\d)/;
    let passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;



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
        let passwordValue = passwordInput.value.trim();
        let confirmPasswordValue = confirmPasswordInput.value.trim();

        if (passwordValue !== confirmPasswordValue) {
            confirmPasswordInput.classList.add("is-invalid");
        } else {
            confirmPasswordInput.classList.remove("is-invalid");
            confirmPasswordInput.classList.add("is-valid");
        }
    });

    function submitForm(event) {
        event.preventDefault();
        let emailValue = emailInput.value.trim();
        let nameValue = nameInput.value.trim();
        let passwordValue = passwordInput.value.trim();
        let confirmPasswordValue = confirmPasswordInput.value.trim();

        if (emailValue === "" || nameValue === "" || passwordValue === "" || confirmPasswordValue === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hay campos vacíos, verifica todos los campos.",
            });
            return;
        } else if (!passwordRegex.test(passwordValue)) {
            Swal.fire({
                icon: "error",
                title: "Contraseña no válida",
                text: "La contraseña debe tener al menos 6 caracteres, incluir al menos una letra mayúscula y un número.",
            });
            return;
        } else if (passwordValue !== confirmPasswordValue) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Las contraseñas no coinciden.",
            });
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let usuarioExistente = usuarios.some(usuario => usuario.emailValue === emailValue);
        let nuevoUsuario = { emailValue, nameValue, passwordValue, login_success: false };

        if (usuarioExistente) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ya existe una cuenta con este correo electrónico.",
            });
        } else {
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Te has registrado correctamente.",
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                emailInput.value = "";
                nameInput.value = "";
                passwordInput.value = "";
                confirmPasswordInput.value = "";

                emailInput.classList.remove("is-valid");
                nameInput.classList.remove("is-valid");
                passwordInput.classList.remove("is-valid");
                confirmPasswordInput.classList.remove("is-valid");

                stringLenght.classList.remove("text-success");
                upperCase.classList.remove("text-success");
                number.classList.remove("text-success");
                setTimeout(function () {
                    window.location.href = "../index.html";
                }, 1000);
            });
        }
    }

    submitButton.addEventListener("click", submitForm);

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
});

