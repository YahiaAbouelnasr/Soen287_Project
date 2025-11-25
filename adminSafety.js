import {auth, database} from "./firebase.js";
import {onAuthStateChanged}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {doc, getDoc} 
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

onAuthStateChanged(auth, (user) =>{
    if(!user) {
        alert("Access denied")
        window.location.href = "/index.html"
        return;
    }

getDoc(doc(database, "users", user.uid))
.then((snap) => {
    if(!snap.exists()) {
        alert("Access denied")
        window.location.href = "/index.html"
        return;
    }

    if (snap.data().isAdmin !== true) {
        alert("Access denied");
        window.location.href = "/index.html"
        return;
    }
 })
  .catch((err) => {
    alert(err.message);
    window.location.href = "/index.html"
  })
})  
