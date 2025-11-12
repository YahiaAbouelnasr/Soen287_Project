import { allResources as staticResources } from "../main_page/staticData.js";

let localResources = JSON.parse(localStorage.getItem("demoResources"));
let demoResources = localResources && localResources.length > 0 ? localResources : staticResources;

window.addEventListener("load", viewExistingResources);
window.addEventListener("load", bindSearchEvent);

function bindSearchEvent() {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) searchBtn.addEventListener("click", search);
}

function search() {
    const search = document.getElementById('search');
    const searchResult = document.getElementById('searchResult');

    if (!search || !searchResult) return;


    const result = searchResource(search.value);
    searchResult.innerHTML = "";
    result.forEach((resource, index) => {
        searchResult.innerHTML += getResourceHtml(resource) +
            `<div class="resource-actions">
                <a href="../edit_resource/edit_resource.html?resourceId=${index}">Edit</a>
                <a href="../remove_resource/remove_resource.html?resourceId=${index}">Delete</a> 
            </div> </div>
            <br />`
    });
}

export function viewExistingResources() {
    let container = document.getElementById("resourceList");

    if (!container) return;

    for (let index = 0; index < demoResources.length; index++) {

        container.innerHTML += `${getResourceHtml(demoResources[index])}`;
    }
    localStorage.setItem("demoResources", JSON.stringify(demoResources));
}

export function getResourceHtml(resource) {
    return `<div class='resource-card'><h3>${resource.name}</h3>
      <p><strong>Type:</strong> ${resource.type}</p>
      <p><strong>Description:</strong> ${resource.description}</p>
      <p><strong>Capabilities:</strong> ${resource.capabilities || "—"}</p>
      <img src="${resource.image}" alt="${resource.name}">
    `;
}

export function findIndexByName(isName, demoResources) {
    for (let index = 0; index < demoResources.length; index++) {
        if (demoResources[index].name.toLowerCase() === isName.toLowerCase().trim()) {
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



function searchResource(query) {
    if (!demoResources || !query || demoResources.length === 0) return;
    return demoResources.filter((resource) => resource.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
}



