import { allResources as staticResources } from "../../shared/js/staticData.js";
import { findIndexByName } from "../main_page/resource_management.js";

let demoResources = JSON.parse(localStorage.getItem("demoResources")) || staticResources ;


export function deleteResource(){
    // Prompt "are you sure?"
    const isName = document.getElementById("isName").value;
    const index = findIndexByName(isName);

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

    location.reload();
}

window.deleteResource = deleteResource;


