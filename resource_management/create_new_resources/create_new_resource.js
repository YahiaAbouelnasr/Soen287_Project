import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"; 
import { database } from "../../firebase.js"

async function createResourceOnSubmit(e){
    e.preventDefault();
    
    // gets input value from users
    const resourceName = document.getElementById('name').value.trim();
    const resourceType = document.getElementById('type').value;
    const resourceDescription = document.getElementById('description').value.trim();
    const resourceCapacity = document.getElementById('capacity').value.trim();
    const resourceLocation = document.getElementById("location").value.trim();
    const resourceAvailability = document.getElementById('availability').value;
    const resourceImage = document.getElementById('image').value.trim();

    if (resourceName === "" 
        || resourceType === ""
        || resourceDescription === "" 
        || resourceLocation === ""
        || (resourceType === "room" && resourceCapacity === "")
        || resourceAvailability === ""
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
        location: resourceLocation,
        capacity: resourceCapacity, 
        availability: resourceAvailability,
        image: resourceImage 
    };

    // add a new doc in my database, collection resources
    const collectionRef = collection(database, "resources");
    await addDoc(collectionRef, newResource);

    window.location.href = "../main_page/resource_management.html";
}
export function handleType(event){
    console.log(event.target.value);
    let selectType = event.target.value;
        if (selectType === "room") {
            document.getElementById("roomField").style.display = "block";
        } else {
            document.getElementById("roomField").style.display = "none";
        }
}
window.createResourceOnSubmit = createResourceOnSubmit;
window.handleType = handleType;