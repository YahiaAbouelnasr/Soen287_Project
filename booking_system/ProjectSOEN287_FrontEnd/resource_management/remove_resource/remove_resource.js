import { allResources as staticResources } from "../../shared/js/staticData.js";
import { findIndexByName, getResourceHtml } from "../main_page/resource_management.js";

let localResources = JSON.parse(localStorage.getItem("demoResources"));
let demoResources = localResources && localResources.length > 0 ? localResources : staticResources;


export function deleteResource(){
    // Prompt "are you sure?"
    const isName = document.getElementById("isName").value;
    const index = findIndexByName(isName, demoResources);

    if (index === -1) {
    return;
  }

    const userConfirm = confirm(`Are you sure you want to delete "${demoResources[index].name}"?`);
    if (!userConfirm) return false;

    // Deletes object and shifts the rest forward in the array
    if (userConfirm)
        {
            demoResources.splice(index, 1);
        }
    alert("Resource was successfully deleted!");
    
    localStorage.setItem("demoResources", JSON.stringify(demoResources));
    
    const url = new URL(window.location.href);
    url.search = ''
    location.replace(url);
}

window.deleteResource = deleteResource;

window.addEventListener("load", loadResource)

function loadResource() {
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams) return;

  const index = searchParams.get('resourceId');
  const resource = demoResources[index];

  const resourceDiv = document.getElementById("resource");

  if(!resourceDiv || !resource ) return;

  document.getElementById("isName").setAttribute("value", resource.name)
  resourceDiv.innerHTML = getResourceHtml(resource);
}

