import {auth} from "../../firebase.js";

import {onAuthStateChanged, updateProfile, deleteUser, signOut}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const form = document.getElementById("profileForm");
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email");
const deleteBtn = document.getElementById("delete");
const logoutBtn = document.getElementById("logOut")


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
        nameInput.select();
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



deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if(!confirm("Are you sure you want to delete your account? This cant be undone"))
        return;

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

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth)
        .then(() => {
            alert("Logged Out");
            window.location.href = "../index.html"
        })
        .catch((err) =>{
            alert(err.message);
        })
        

    } )
}
