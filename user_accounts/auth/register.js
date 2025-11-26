import {auth} from "../../firebase.js";
import {
    createUserWithEmailAndPassword, updateProfile
}from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const pass = passInput.value;

    if(!email.endsWith("@live.concordia.ca") && !email.endsWith("@concordia.ca")) {
        alert("Email must be a concordia email");
        emailInput.focus();
        emailInput.select();
        return
    }

    createUserWithEmailAndPassword(auth, email, pass) 
    .then((uCredentials) => {
        const user = uCredentials.user;

        if(name) {
            return updateProfile(user, {displayName : name}).then(() => user);
        }

    return user;
    })
    .then((user) => {
        alert("Account Created, Please Log in.");
        window.location.href = "../index.html";
    }) 
    .catch((err) => {
            alert(err.message)
    })
})

