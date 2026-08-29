/* ===========================
   LOADER
=========================== */

window.addEventListener("load", function () {

    setTimeout(function () {

        const loader = document.getElementById("loader");
        const content = document.getElementById("content");

        if (loader) {
            loader.style.display = "none";
        }

        if (content) {
            content.style.display = "block";
        }

    }, 3000);

});


/* ===========================
   SMOOTH SCROLL
=========================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


/* ===========================
   EXPLORE BUTTON
=========================== */

const exploreBtn = document.querySelector(".hero button");

if (exploreBtn) {

    exploreBtn.addEventListener("click", function () {

        const services = document.querySelector(".services");

        if (services) {

            services.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* ===========================
   LOGIN PASSWORD SHOW / HIDE
=========================== */

function togglePassword() {

    const password = document.getElementById("password");

    if (!password) return;

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }

}


/* ===========================
   SIGNUP PASSWORD SHOW / HIDE
=========================== */

function toggleSignupPassword() {

    const password = document.getElementById("signupPassword");

    if (!password) return;

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }

}


/* ===========================
   CONFIRM PASSWORD SHOW / HIDE
=========================== */

function toggleConfirmPassword() {

    const password = document.getElementById("confirmPassword");

    if (!password) return;

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }

}


/* ===========================
   SIGNUP SYSTEM
=========================== */

function validateSignup() {

    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("signupEmail");
    const passwordElement = document.getElementById("signupPassword");
    const confirmElement = document.getElementById("confirmPassword");

    if (!nameElement || !emailElement || !passwordElement || !confirmElement) {
        return false;
    }

    const name = nameElement.value.trim();
    const email = emailElement.value.trim().toLowerCase();
    const password = passwordElement.value;
    const confirmPassword = confirmElement.value;


    if (name === "" || email === "" || password === "" || confirmPassword === "") {

        alert("Please fill all fields.");

        return false;

    }


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return false;

    }


    const existingUser = localStorage.getItem("nityasamUser");

    if (existingUser) {

        const user = JSON.parse(existingUser);

        if (user.email === email) {

            alert("This email is already registered. Please Login.");

            return false;

        }

    }


    const userData = {

        name: name,
        email: email,
        password: password

    };


    localStorage.setItem(
        "nityasamUser",
        JSON.stringify(userData)
    );


    alert("Account created successfully! 🎉");

    window.location.href = "login.html";

    return false;

}


/* ===========================
   LOGIN SYSTEM
=========================== */

function validateLogin() {

    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    if (!emailElement || !passwordElement) {
        return false;
    }

    const email = emailElement.value.trim().toLowerCase();
    const password = passwordElement.value;


    if (email === "" || password === "") {

        alert("Please enter Email and Password.");

        return false;

    }


    const savedUser = localStorage.getItem("nityasamUser");


    if (!savedUser) {

        alert("No account found. Please Sign Up first.");

        return false;

    }


    const user = JSON.parse(savedUser);


    if (email === user.email && password === user.password) {

        localStorage.setItem("nityasamLoggedIn", "true");

        alert("Login Successful! 🎉");

        window.location.href = "index.html";

        return false;

    }


    alert("Invalid Email or Password.");

    return false;

}


/* ===========================
   CONSOLE
=========================== */

console.log("🌾 Nityasam Agriculture Hub");
console.log("Designed & Developed by Tirth Barot");