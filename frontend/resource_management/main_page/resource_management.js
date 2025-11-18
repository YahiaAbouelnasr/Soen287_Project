import { allResources as staticResources } from "./staticData.js";

let saved = localStorage.getItem("demoResources");
let localResources = saved ? JSON.parse(saved) : null;

let demoResources = (localResources && localResources.length > 0)
  ? localResources
  : staticResources;

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

// TODO: implement this
function groupByCategory(demoResources){
    let room = [];
    let equipment = [];

    demoResources.forEach(resource => {
        if (resource.type === "Room") room.push(resource)
        else if (resource.type === "Equipment") equipment.push(resource)
    });

    return {
        Room: room,
        Equipment: equipment
    }
}

function searchResource(query) {
    if (!demoResources || !query || demoResources.length === 0) return;
    return demoResources.filter((resource) => resource.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
}



