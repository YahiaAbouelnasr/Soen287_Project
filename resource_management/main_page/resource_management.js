import { allResources } from "../../shared/js/staticData";
const resource = {
    name: 'M4 Macbook Air',
    type: 'laptop',
    description: 'a computer than can be used by students or teachers',
    image: 'https://www.apple.com/v/macbook-air/w/images/overview/design/color/design_top_skyblue__eepkvlvjzcia_large_2x.jpg'
}

// const allResources = [{
//         name: 'resourceName', 
//         type: 'resourceType', 
//         description: 'resourceDescription', 
//         capabilities: 'resourceCapabilities', 
//         image: resourceImage
// }];

// localStorage.setItem("allResources", JSON.stringify(allResources));

function redirect(route){
    window.location.href = route;
}

function viewExistingResources(){
    let container = document.getElementById("resourceList");

    for (let index = 0; index < array.length; index++) {
        container.innerHTML = "";

        container.innerHTML += `<p>
        <strong>${index+1}.--------------------</strong><br>
        Name: ${allResources[index].name}<br>
        Type: ${allResources[index].type}<br>
        Description: ${allResources[index].description}<br>
        Capabilities: ${allResources[index].capabilities}<br>
        ${allResources[index].image}<br>
        </p>`;
        }
}

// TODO check if there's an ignore case method
function findIndexByName(isName) {
    for (index = 0; index < allResources.length; index++)
    {
        if (allResources[index].name == isName){
            return index;
        }
    }
    alert("Resource not found");
    return false;
}


function loadResources() {
    document.getElementById('resource-name').innerText = resource.name;
    document.getElementById('resource-type').innerText = resource.type;
    document.getElementById('resource-description').innerText = resource.description;
    document.getElementById('resource-image').setAttribute('src', resource.image);
}



