

import { allResources as staticResources } from "../../shared/js/staticData.js";
import { findIndexByName } from "../main_page/resource_management.js";

// Load saved resources if available
let localResources = JSON.parse(localStorage.getItem("demoResources"));
let demoResources = localResources && localResources.length > 0 ? localResources : staticResources;

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveBtn");

const editForm = document.getElementById("editForm");
const editName = document.getElementById("editName");

let index = -1;


// Load resource details into form
loadBtn.addEventListener("click", () => {
  const name = document.getElementById("editName").value.trim();
  index = findIndexByName(name, demoResources);

  if (index < 0) return;

  const resource = demoResources[index];
  loadFormData(resource);

  editForm.style.display = "block";
});

function loadFormData(resource) {
  document.getElementById("newName").value = resource.name;
  document.getElementById("newType").value = resource.type;
  document.getElementById("newDescription").value = resource.description;
  document.getElementById("newCapabilities").value = resource.capabilities;
  document.getElementById("newImage").value = resource.image;
}

// Save updated resource back to array and localStorage
saveBtn.addEventListener("click", () => {
  if (index === -1) {
    alert("Resource not found!");
    return;
  }

  const updatedResource = {
    name: document.getElementById("newName").value.trim(),
    type: document.getElementById("newType").value.trim(),
    description: document.getElementById("newDescription").value.trim(),
    capabilities: document.getElementById("newCapabilities").value.trim(),
    image: document.getElementById("newImage").value.trim(),
  };

  demoResources[index] = updatedResource;
  localStorage.setItem("demoResources", JSON.stringify(demoResources));

  alert(`"${updatedResource.name}" has been updated successfully!`);

  location.reload();

  // Optional: hide the form again or reload the page
  editForm.style.display = "none";
  editName.value = "";
});


window.addEventListener("load", loadResource)

function loadResource() {
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams) return;

  const i = searchParams.get('resourceId');
  const resource = demoResources[i];
  index = i;
  loadFormData(resource);

  editForm.style.display = "block";
}
