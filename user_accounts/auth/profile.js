import {auth} from "./firebase.js";

import {onAuthStateChanged, updateProfile, deleteUser}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const form = document.getElementById("profileForm");
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email");
const img = document.getElementById("prfPic");
const deleteBtn = document.getElementById("delete");

onAuthStateChanged(auth, (user) => {
    nameInput.value = user.displayName
    emailInput.value = user.email;
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const newName = nameInput.value;

    if(!newName) {
        alert("Name must not be empty");
        nameInput.focus();
        return;
    }

    updateProfile(user, {displayName: newName})
    .then(() => {
        alert("Profile updated");
    })
    .catch((err) => {
        alert(err.message)
    })
})

let inputFile = document.getElementById("input-file");
inputFile.onchange = function() {
    if (inputFile.files && inputFile.files[0]) {
        img.src = URL.createObjectURL(inputFile.files[0]);
    }
}

deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    
    deleteUser(user) 
    .then(()=> {
        alert("Account deleted");
        window.location.href = "register.html";
    })
    .catch((err) => {
        alert(err.message);
    })
})
