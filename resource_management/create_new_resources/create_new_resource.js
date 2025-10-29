import { allResources as staticResources } from "../main_page/staticData.js";

let demoResources = localStorage.setItem("demoResources", JSON.stringify([])) || staticResources;


function createResourceOnSubmit(e){
    e.preventDefault();

    // gets input value from users
    const resourceName = document.getElementById('name').value;
    const resourceType = document.getElementById('type').value;
    const resourceDescription = document.getElementById('description').value;
    const resourceCapabilities = document.getElementById('capacity').value;
    const resourceImage = document.getElementById('image').files[0];

    if (resourceName == "" 
        && resourceType == ""
        && resourceDescription == "" 
        && resourceCapabilities == ""
        && resourceImage == null){
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
    
    const demoResources = JSON.parse(localStorage.getItem("demoResources"));
    
    demoResources.push(newResource);

    console.log(JSON.stringify(demoResources));

    localStorage.setItem("demoResources", JSON.stringify(demoResources));

    location.reload();
}
window.createResourceOnSubmit = createResourceOnSubmit;