// isName = document.getElementById("isName").value;

// function changeResourceAttribute(isName){
//     if (findIndexByName(isName) == false){
//         return false;
//     }
//     index = findIndexByName(isName);

//     // gets input value from users (if unchanged, should remain the same value)
//     allResources[index].name = document.getElementById('name').value;
//     allResources[index].type = document.getElementById('type').value;
//     allResources[index].description = document.getElementById('description').value;
//     allResources[index].capabilities = document.getElementById('capabilities').value;
//     allResources[index].image = document.getElementById('image').files[0];

//     alert(allResources[index].name+" attributes have been changed!");
// }

import { allResources as staticResources } from "../../shared/js/staticData.js";
import { findIndexByName } from "../main_page/resource_management.js";

// Load saved resources if available
let allResources =
  JSON.parse(localStorage.getItem("allResources")) || staticResources;

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveBtn");

const editForm = document.getElementById("editForm");
const editName = document.getElementById("editName");

let currentIndex = -1;

// Load resource details into form
loadBtn.addEventListener("click", () => {
  const name = editName.value.trim();
  currentIndex = findIndexByName(name);

  if (currentIndex === -1) {
    alert("Resource not found!");
    return;
  }

  const resource = allResources[currentIndex];
  document.getElementById("newName").value = resource.name;
  document.getElementById("newType").value = resource.type;
  document.getElementById("newDescription").value = resource.description;
  document.getElementById("newCapabilities").value = resource.capabilities;
  document.getElementById("newImage").value = resource.image;

  editForm.style.display = "block";
});

// Save updated resource back to array and localStorage
saveBtn.addEventListener("click", () => {
  if (currentIndex === -1) return;

  const updatedResource = {
    name: document.getElementById("newName").value.trim(),
    type: document.getElementById("newType").value.trim(),
    description: document.getElementById("newDescription").value.trim(),
    capabilities: document.getElementById("newCapabilities").value.trim(),
    image: document.getElementById("newImage").value.trim(),
  };

  allResources[currentIndex] = updatedResource;
  localStorage.setItem("allResources", JSON.stringify(allResources));

  alert(`"${updatedResource.name}" has been updated successfully!`);

  // Optional: hide the form again or reload the page
  editForm.style.display = "none";
  editName.value = "";
});
