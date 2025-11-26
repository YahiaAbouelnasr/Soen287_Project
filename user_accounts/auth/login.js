import {auth, database} from "../../firebase.js";

import {signInWithEmailAndPassword}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {doc, getDoc} 
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";


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

        return getDoc(doc(database, "users", user.uid))
        .then((snap) => {
            if(!snap.exists()) {
                alert("Login Successful")
                window.location.href="../dashboard_notifications/student_dashboard.html"
                return;
            }

            const data= snap.data();
            if(data.isAdmin == true) {
                alert("Admins cant login here")
                return;
            }

            alert("Login Sucessful");
            window.location.href="../dashboard_notifications/student_dashboard.html"
        })


    })
    .catch((err) =>{
        alert(err.message);
    })
    
})
        
