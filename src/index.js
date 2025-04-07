import { signUp, login, logout } from "./auth";

const signUpForm = document.querySelector("#signupForm");
const loginForm = document.querySelector("#loginForm");
const logoutForm = document.querySelector("#logoutForm");

signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstname = document.getElementById("signupFirstName").value;
    const lastname = document.getElementById("signupLastName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    console.log("Sign Up Data:", { firstname, lastname, email, password });

    signUp(firstname, lastname, email, password);
});

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    console.log("Login Data:", { email, password });

    login(email, password);
});

logoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    logout();
    console.log("User logged out.");
});
