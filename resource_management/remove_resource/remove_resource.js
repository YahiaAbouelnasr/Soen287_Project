import { allResources } from "../../shared/js/staticData.js";
isName = document.getElementById("isName").value;



function deleteResource(isName){
    // Finds index
    if (findIndexByName(isName) == false){
        return false; // No name found
    }
    // sets found index
    index = findIndexByName(isName);

    // Prompt "are you sure?"
    const userConfirm = confirm(`Are you sure you want to delete "${allResources[index].name}"?`);
    if (!userConfirm) return false;

    // Deletes object and shifts the rest forward in the array
    if (userConfirm)
        {
            allResources.splice(index, 1);
        }

    alert("Resource was successfully deleted!");
}

// TODO: Repeat same pattern of "check hardcoded data and change them there"
