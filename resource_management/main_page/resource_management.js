import { allResources as demoResources } from "../../shared/js/staticData.js";
const resource = {
    name: 'M4 Macbook Air',
    type: 'laptop',
    description: 'a computer than can be used by students or teachers',
    image: 'https://www.apple.com/v/macbook-air/w/images/overview/design/color/design_top_skyblue__eepkvlvjzcia_large_2x.jpg'
}

// const demoResources = [{
//         name: 'resourceName', 
//         type: 'resourceType', 
//         description: 'resourceDescription', 
//         capabilities: 'resourceCapabilities', 
//         image: resourceImage
// }];

// localStorage.setItem("demoResources", JSON.stringify(demoResources));

export function redirect(route){
    window.location.href = route;
}

export function viewExistingResources(){
    let container = document.getElementById("resourceList");
    container.innerHTML = "";

    for (let index = 0; index < demoResources.length; index++) {

        container.innerHTML += `<p>
        <strong>${index+1}.--------------------</strong><br>
        Name: ${demoResources[index].name}<br>
        Type: ${demoResources[index].type}<br>
        Description: ${demoResources[index].description}<br>
        Capabilities: ${demoResources[index].capabilities}<br>
        <img src="${demoResources[index].image}" width="200" alt="${demoResources[index].name}"><br>
        </p>`;
        }
}
window.viewExistingResources = viewExistingResources;
window.addEventListener("DOMContentLoaded", viewExistingResources);


// TODO check if there's an ignore case method
export function findIndexByName(isName) {
    for (let index = 0; index < demoResources.length; index++)
    {
        if (demoResources[index].name.toLowerCase() === isName.toLowerCase().trim()){
            return index;
        }
    }
    alert("Resource not found");
    return -1;
}


export function loadResources() {
    document.getElementById('resource-name').innerText = resource.name;
    document.getElementById('resource-type').innerText = resource.type;
    document.getElementById('resource-description').innerText = resource.description;
    document.getElementById('resource-image').setAttribute('src', resource.image);
}



