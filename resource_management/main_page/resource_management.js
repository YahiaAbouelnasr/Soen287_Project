import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { database } from '../../firebase.js'


const resources = []; 

window.addEventListener("load", loadResources);
window.addEventListener("load", viewExistingResources);
window.addEventListener("load", bindSearchEvent);

async function loadResources() {
    const collectionRef = collection(database, "resources")
    const queryRef = query(collectionRef, where("capacity", "==", "0"));
    const documents = await getDocs(queryRef);
    documents.forEach((doc) => {
        const resourceDoc = doc.data();
        resourceDoc.id = doc.id;
        resources.push(resourceDoc);
    }); 
    console.log(resources)
}

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
    result.forEach((resource) => {
        searchResult.innerHTML += getResourceHtml(resource) +
            `<div class="resource-actions">
                <a href="../edit_resource/edit_resource.html?resourceId=${resource.id}">Edit</a>
                <a href="../remove_resource/remove_resource.html?resourceId=${resource.id}">Delete</a> 
            </div> </div>
            <br />`
    });
}

export function viewExistingResources() {
    let container = document.getElementById("resourceList");

    if (!container) return;

    for (let index = 0; index < resources.length; index++) {

        container.innerHTML += `${getResourceHtml(resources[index])}`;
    }
}

export function getResourceHtml(resource) {
    return `<div class='resource-card'><h3>${resource.name}</h3>
      <p><strong>Type:</strong> ${resource.type}</p>
      <p><strong>Description:</strong> ${resource.description}</p>
      <p><strong>Capacity:</strong> ${resource.capacity || "—"}</p>
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
    if (!resources || !query || resources.length === 0) return;
    return resources.filter((resource) => resource.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
}



