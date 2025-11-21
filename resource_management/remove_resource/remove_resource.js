import { doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { database } from "../../firebase.js"
import { getResourceHtml } from "../../shared/shared_functions.js";

let resource;

window.addEventListener("load", loadResource);

async function deleteResource(){
  const searchParams = new URLSearchParams(window.location.search);
  
  const userConfirm = confirm(`Are you sure you want to delete "${resource.name}"?`);
  if (!userConfirm) return false;
  if (userConfirm)
      {
        const resourceId = searchParams.get('resourceId');
        await deleteDoc(doc(database, "resources", resourceId));
      }
  alert("Resource was successfully deleted!");
  window.location.href = "../main_page/resource_management.html";
}

window.deleteResource = deleteResource;



async function loadResource() {
  const searchParams = new URLSearchParams(window.location.search);
  if (!searchParams) return; //FIXME: whats the point of this

  const resourceId = searchParams.get('resourceId');
  const resourceDocRef = doc(database, "resources",  resourceId);
  const resourceDoc = await getDoc(resourceDocRef);

  if (resourceDoc.exists()) {
    resource = resourceDoc.data();
    resource.id = resourceDocRef.id; 
    console.log(resource);
  } else {
    alert("No such document!");
    window.location.href = "../main_page/resource_management.html";
  }

  let resourceDiv = document.getElementById("resource");

  if(!resourceDiv || !resource ) return;

  resourceDiv.innerHTML = getResourceHtml(resource, false);
}

window.loadResource = loadResource;