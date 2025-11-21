import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { database } from "../../firebase.js"

let resource;


const saveBtn = document.getElementById("saveBtn");
const editForm = document.getElementById("editForm");

export function loadFormData() {
  document.getElementById("newName").value = resource.name;
  document.getElementById("newType").value = resource.type;
  document.getElementById("newDescription").value = resource.description;
  document.getElementById("newCapacity").value = resource.capacity;
  document.getElementById('newAvailability').value = resource.availability;
  document.getElementById("newImage").value = resource.image;
}

saveBtn.addEventListener("click", readResource);

async function readResource() {

  let updatedName = document.getElementById("newName").value.trim();
  let updatedType = document.getElementById("newType").value;
  let updatedDescription = document.getElementById("newDescription").value.trim();
  let updatedCapacity = document.getElementById("newCapacity").value.trim();
  let updatedAvailability = document.getElementById('newAvailability').value;
  let updatedImage = document.getElementById("newImage").value.trim();

  const updates = {};
  
  if (resource.name !== updatedName) updates.name = updatedName;
  if (resource.type !== updatedType) {
    updates.type = updatedType;
    if (updatedType === "equipment") updatedCapacity = "";
  }
  if (resource.description !== updatedDescription) updates.description = updatedDescription;
  if (resource.capacity !== updatedCapacity) updates.capacity = updatedCapacity;
  if (resource.availability !== updatedAvailability) updates.availability = updatedAvailability;
  if (resource.image !== updatedImage) updates.image = updatedImage;

  // Only perform update if changes exist
  if (Object.keys(updates).length > 0) {
    const resourceRef = doc(database, "resources", resource.id);
    await updateDoc(resourceRef, updates);
    alert(`Resource has successfully updated!`);
    window.location.href = "../main_page/resource_management.html";
  }
  else {
    alert("No change in details was found. Resource update was unsuccesful!");
    return;
  }
}


window.addEventListener("load", loadResource)
window.addEventListener("load", loadFormData)

async function loadResource() {
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams) return; 

  const resourceId = searchParams.get('resourceId');

  const resourceDocRef = doc(database, "resources",  resourceId);
  const resourceDoc = await getDoc(resourceDocRef);

  if (resourceDoc.exists()) {
    resource = resourceDoc.data();
    resource.id = resourceDocRef.id;
    console.log(resource)
    // FIXME:toast.success("🚀 Successfully loaded your toast!");
  } else {
    alert("No such document!");
    window.location.href = "../main_page/resource_management.html";
  }
  loadFormData();
  if (resource.type === "equipment") document.getElementById("capacityDisplay").classList.add("hidden");
  else if (resource.type === "room") document.getElementById("capacityDisplay").classList.remove("hidden");
  if (resource.capacity === "") document.getElementById("newCapacity").placeholder = "e.g. 22 (people)";
  editForm.style.display = "block"; // FIXME: What is this
}

export function changeDisplayCapacityOnClick(){
  let chosenType = document.getElementById("newType").value;
  if (chosenType === "equipment") document.getElementById("capacityDisplay").classList.add("hidden");
  else if (chosenType === "room") document.getElementById("capacityDisplay").classList.remove("hidden");
}
window.addEventListener("click", changeDisplayCapacityOnClick);