import {auth} from "./firebase.js";
import {onAuthStateChanged}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("Access denied");
        window.location.href = "/index.html";
        return
    }
})
