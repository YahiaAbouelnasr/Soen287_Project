import {auth, databse} from "../../firebase.js";

import {signInWithEmailAndPassword}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {doc, getDoc} 
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const form = document.getElementById("adminForm");
const emailInput = document.getElementById("adminEmail");
const passInput = document.getElementById("adminPassword");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const pass = passInput.value;

    signInWithEmailAndPassword(auth, email, pass) 
    .then((uCredentials) => {
        const user = uCredentials.user;
        return getDoc(doc(databse, "users", user.uid))
        .then((snap)=> {
            if(!snap.exists() || snap.data().isAdmin !== true) {
                alert("Access denied, only admins")
                return;
            }
            window.location.href = "../dashboard_notifications/admin_dashboard.html";
        })
    })
    .catch((err)=> {
        alert(err.message);
    })
    
})
