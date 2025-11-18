import {auth} from "./firebase.js";

import {signInWithEmailAndPassword}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const pass = passInput.value;

    signInWithEmailAndPassword(auth, email, pass) 
    .then((uCredentials) => {
        const user = uCredentials.user;
        alert("Login Sucessful!");
        window.location.href = "../dashboard_notifications/index.html"
    })
    .catch((err) => {
            alert(err.message)
    })
})
