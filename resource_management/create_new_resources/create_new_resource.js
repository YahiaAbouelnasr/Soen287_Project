import { allResources as staticResources } from "../main_page/staticData.js";
import { doc, setDoc } from "firebase/firestore"; 
import { database } from "../../firebase.js"

let demoResources = localStorage.setItem("demoResources", JSON.stringify([])) || staticResources;


async function createResourceOnSubmit(e){
    e.preventDefault();
    
    // gets input value from users
    const resourceName = document.getElementById('name').value.trim();
    const resourceType = document.getElementById('type').value.trim();
    const resourceDescription = document.getElementById('description').value.trim();
    const resourceCapabilities = document.getElementById('capacity').value.trim();
    const resourceImage = document.getElementById('image').value.trim();

    if (resourceName === "" 
        || resourceType === ""
        || resourceDescription === "" 
        || resourceCapabilities === ""
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
        capabilities: resourceCapabilities, 
        image: resourceImage 
    };
    
    //const demoResources = JSON.parse(localStorage.getItem("demoResources"));
    
    //demoResources.push(newResource);

    //console.log(JSON.stringify(demoResources));

    //localStorage.setItem("demoResources", JSON.stringify(demoResources));


    // Add a new document in collection "cities"
    const newResourceDoc = doc(database, "resources", newResource.name)

    await setDoc(newResourceDoc, newResource);

    document.querySelector("form").reset();
}
window.createResourceOnSubmit = createResourceOnSubmit;