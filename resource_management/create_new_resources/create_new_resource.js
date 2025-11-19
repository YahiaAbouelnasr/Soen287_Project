
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"; 
import { database } from "../../firebase.js"

async function createResourceOnSubmit(e){
    e.preventDefault();
    
    // gets input value from users
    const resourceName = document.getElementById('name').value.trim();
    const resourceType = document.getElementById('type').value.trim();
    const resourceDescription = document.getElementById('description').value.trim();
    const resourceCapacity = document.getElementById('capacity').value.trim();
    const resourceImage = document.getElementById('image').value.trim();

    if (resourceName === "" 
        || resourceType === ""
        || resourceDescription === "" 
        || resourceCapacity === ""
        || resourceImage === ""){
            alert("Missing information, resource creation unsuccessful.");
            return;
        }
    alert("New resource created!");


    // creates an object out of input value from user
    const newResource = {
        name: resourceName, 
        type: resourceType, 
        description: resourceDescription, 
        capacity: resourceCapacity, 
        image: resourceImage 
    };

    // Add a new document in collection "cities"
    const collectionRef = collection(database, "resources");
    await addDoc(collectionRef, newResource);

    document.querySelector("form").reset();
}
window.createResourceOnSubmit = createResourceOnSubmit;