import {auth} from "../../firebase.js";

import {onAuthStateChanged, updateProfile, deleteUser, signOut}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const form = document.getElementById("profileForm");
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email");
const studentIdInput = document.getElementById("studentID");
const deleteBtn = document.getElementById("delete");
const logoutBtn = document.getElementById("logOut")


onAuthStateChanged(auth, (user) => {
    if(!user) {
        window.location.href = "../index.html"
        return;
    }
    nameInput.value = user.displayName
    emailInput.value = user.email;
    studentIdInput.value = user.photoURL;
    
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if(!user) {
        window.location.href = "../index.html"
        return;
    }

    const newName = nameInput.value;
    const newStudentId = studentIdInput.value;

    if(!newName) {
        alert("Name must not be empty");
        nameInput.focus();
        nameInput.select();
        return;
    }

    if(!newStudentId) {
        alert("Student ID must not be empty");
        studentIdInput.focus();
        studentIdInput.select();
    }

    updateProfile(user, {displayName: newName, photoURL: newStudentId})
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
    if(!user) {
        window.location.href = "../index.html"
        return;
    }
    
    deleteUser(user) 
    .then(()=> {
        alert("Account deleted");
        window.location.href = "..index/.html";
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
