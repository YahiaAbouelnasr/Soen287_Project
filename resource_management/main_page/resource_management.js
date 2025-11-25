import { collection, query, where, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { database } from '../../firebase.js'
import { getResourceHtml } from "../../shared/shared_functions.js";


export let resources = []; 
let currentCategory = "All";
let currentSearchQuery = "";
let isSearchMode = false;
let showUnavailable = false;
let result;

window.addEventListener("load", loadResources);
window.addEventListener("load", bindSearchEvent);
window.addEventListener("load", bindResetEvent);
window.addEventListener("load", bindSortByCategoryBtn);
window.addEventListener("load", bindSortBySearchCategoryBtn);
document.getElementById("createRedirect").addEventListener("click", () =>
    {
        window.location.href = "../create_new_resources/create_new_resource.html";
    });
document.getElementById("toggleUnavailable").addEventListener("change", event => {
    showUnavailable = event.target.checked;
    viewExistingResources();
});

document.getElementById("toggleSearchUnavailable").addEventListener("click", event => {
    showUnavailable = event.target.checked;
    search();
});

document.addEventListener("click", handleEditDeleteBtn);

async function loadResources() {
    const collectionRef = collection(database, "resources")
    const queryRef = query(collectionRef);
    const documents = await getDocs(queryRef);
    documents.forEach((doc) => {
        const resourceDoc = doc.data();
        resourceDoc.id = doc.id;
        resources.push(resourceDoc);
    }); 
    console.log(resources)
    viewExistingResources();
    const allBtn = document.querySelectorAll("[data-type='All']");
    if (allBtn) allBtn.forEach(btn => btn.classList.add("active"));
}

function bindSearchEvent() {
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        currentCategory = "All";
        searchBtn.addEventListener("click", search);  
    }
    
}
function search() {
    const searchInput = document.getElementById('search');
    const searchResult = document.getElementById('searchResult');

    if (!searchInput || !searchResult) return;
    

    currentSearchQuery = searchInput.value.toLowerCase().trim();

    if (!isSearchMode){
        currentCategory = "All";
        showUnavailable = false;
        document.getElementById("toggleSearchList").classList.remove("hidden");
    }

    // get unified filtered results
    result = [];
    isSearchMode = true;
    result = getFilteredResources(resources)
        .filter(r => r.name.toLowerCase().includes(currentSearchQuery)).slice(0, 3);
        
    resultHandler(result); // changes display list -> result (if exists)
    searchResult.innerHTML = "";

    if (result.length === 0) {
        searchResult.innerHTML = "<p>No resources found</p>";
        return;
    }

    result.forEach(resource => {
        searchResult.innerHTML += getResourceHtml(resource);
    });
    
}

function bindResetEvent() {
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.addEventListener("click", reset);
    
}
// FIXME: do i even need to export these if i have window (unless for another js)
export function reset(){
    const search = document.getElementById('search');
    const searchResult = document.getElementById('searchResult');

    currentSearchQuery = ""; 
    search.value = "";
    searchResult.innerHTML = "";

    document.getElementById('toggleList').classList.remove("hidden");
    document.getElementById('resetBtn').classList.add("hidden");

    document.getElementById('toggleUnavailable').checked = false;
    document.getElementById('toggleSearchUnavailable').checked = false;
    showUnavailable = false;
    isSearchMode = false;
    currentCategory = "All";

    document.querySelectorAll("#categoryButtons button, #searchCategoryButtons button")
    .forEach(buttonByCategory => buttonByCategory.classList.remove("active"));

    document.getElementById("toggleSearchList").classList.add("hidden");

    document.querySelector('#categoryButtons [data-type="All"]').classList.add("active");
    document.querySelector('#searchCategoryButtons [data-type="All"]').classList.add("active");

    viewExistingResources();
   
}

export function viewExistingResources() {
    const filteredResources = getFilteredResources(resources);
    const container = document.getElementById("list");
    if (!container) return;
    container.innerHTML = ""; // clears my display depending on button click

    filteredResources.forEach(resource => {
        container.insertAdjacentHTML("beforeend", getResourceHtml(resource));
    })

    if ( (resources.length %2 ) != 0 ) {
        list.classList.add("center-single");
    } else {
        list.classList.remove("center-single");
    }
}
function sortResourcesByName(resources) {
    if (!resources || !Array.isArray(resources)) return [];
    return resources.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    // Does this start with a number?? TEST
    const isNumA = /^\d/.test(nameA); 
    const isNumB = /^\d/.test(nameB);

    // If A starts with number but B doesn't, then A first
    if (isNumA && !isNumB) return -1;

    // If B starts with number but A doesn't, then B first
    if (!isNumA && isNumB) return 1;

    // If both either numbers or both letters, its just a normal A-Z sort
    return nameA.localeCompare(nameB);
    
  });
}

export function bindSortByCategoryBtn(){
    const sortBtn = document.getElementById('categoryButtons');
    if (sortBtn) sortBtn.addEventListener("click", sortByCategory);
}
export function bindSortBySearchCategoryBtn(){
    const sortBtn = document.getElementById('searchCategoryButtons');
    if (sortBtn) sortBtn.addEventListener("click", sortByCategory);
}

export function sortByCategory(event){

    const categoryBtn = event.target.closest("button");
    if (!categoryBtn) return;

    currentCategory = categoryBtn.dataset.type;
    
    // Only clears the buttons inside this strip
    const parentStrip = categoryBtn.closest(".title-buttons");
    parentStrip.querySelectorAll("button").forEach(b => b.classList.remove("active"));


    categoryBtn.classList.add("active");

    updateUI()

}

function resultHandler(result){
//     const searchResult = document.getElementById('searchResult');
//     if (!result){
//         document.getElementById('toggleList').classList.remove("hidden");
//         document.getElementById('resetBtn').classList.add("hidden");
//         document.getElementById('toggleSearchList').classList.add("hidden");
//         isSearchMode = false;
//         document.getElementById('list').scrollIntoView();
//         return;
//     }
//     else if (result.length === 0){
//         searchResult.innerHTML = "No resources found";
//         return;
//     }
//     if (isSearchMode) return; 
//         document.getElementById('toggleList').classList.add("hidden");
//         document.getElementById('resetBtn').classList.remove("hidden");
//         document.getElementById('toggleSearchList').classList.remove("hidden");
//         document.getElementById('searchResult').scrollIntoView();
   const searchResult = document.getElementById('searchResult');

    // Always hide main list when in search mode
    if (isSearchMode) {
        document.getElementById('toggleList').classList.add("hidden");
        document.getElementById('toggleSearchList').classList.remove("hidden");
        document.getElementById('resetBtn').classList.remove("hidden");
    } else {
        document.getElementById('toggleList').classList.remove("hidden");
        document.getElementById('toggleSearchList').classList.add("hidden");
        document.getElementById('resetBtn').classList.add("hidden");
    }

    if (!result || result.length === 0) {
        searchResult.innerHTML = "<p>No resources found</p>";
        return;
    }

    // populate search results
    searchResult.innerHTML = "";
    result.forEach(resource => {
        searchResult.innerHTML += getResourceHtml(resource);
    });


}

function getFilteredResources(resources) {
    let list = [...resources];

    // CATEGORY filter
    if (currentCategory !== "All") {
        list = list.filter(r => r.type === currentCategory);
    }

    // AVAILABILITY filter
    if (!showUnavailable) {
        list = list.filter(r => r.availability === "Available");
    }

    // SEARCH filter (inactive until later)
    if (currentSearchQuery.trim() !== "") {
        const q = currentSearchQuery.toLowerCase();
        list = list.filter(r => r.name.toLowerCase().includes(q));
    }

    // SORT (my existing sorting)
    sortResourcesByName(list);

    return list;
}
function updateUI() {
    if (isSearchMode) {
        search();        // update search results 
    } else {
        viewExistingResources();  // update main list
    }
}

async function handleEditDeleteBtn(event){
    // EDIT btn
    const editBtn = event.target.closest(".edit-btn");
    if (editBtn) {
        // "Setting up the edit"
        event.preventDefault(); // prevent redirect just in case
        const id = editBtn.dataset.id;
        console.log("Edit clicked for resource:", id);
        // edit btn action
        window.location.href = `../edit_resource/edit_resource.html?resourceId=${id}`;
        return;
    }

    // DELETE btn
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {

        event.preventDefault(); 
        const id = deleteBtn.dataset.id;
        console.log("Delete clicked for resource:", id);

        let deleted = await deleteResource(id);
        
        if (deleted) updateUI();
    }
}

async function deleteResource(resourceId){
  
  const userConfirm = confirm(`Are you sure you want to delete this resource?`);
  if (!userConfirm) return false;
  await deleteDoc(doc(database, "resources", resourceId));
  resources = resources.filter(r => r.id !== resourceId); 
  alert("Resource was successfully deleted!");
  return true;
}

