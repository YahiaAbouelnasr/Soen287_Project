isName = document.getElementById("isName").value;

function changeResourceAttribute(isName){
    if (findIndexByName(isName) == false){
        return false;
    }
    index = findIndexByName(isName);

    // gets input value from users (if unchanged, should remain the same value)
    allResources[index].name = document.getElementById('name').value;
    allResources[index].type = document.getElementById('type').value;
    allResources[index].description = document.getElementById('description').value;
    allResources[index].capabilities = document.getElementById('capabilities').value;
    allResources[index].image = document.getElementById('image').files[0];

    alert(allResources[index].name+" attributes have been changed!");
}
// TODO: Repeat same pattern of "check hardcoded data and change them there"