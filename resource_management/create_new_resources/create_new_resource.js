localStorage.setItem("allResources", JSON.stringify([]));


function createResourceOnSubmit(e){
    e.preventDefault();
    alert("New resource created!");

    // gets input value from users
    const resourceName = document.getElementById('name').value;
    const resourceType = document.getElementById('type').value;
    const resourceDescription = document.getElementById('description').value;
    const resourceCapabilities = document.getElementById('capacity').value;
    const resourceImage = document.getElementById('image').files[0];

    // creates an object out of input value from user
    const newResource = {
        name: resourceName, 
        type: resourceType, 
        description: resourceDescription, 
        capabilities: resourceCapabilities, 
        image: resourceImage 
    };
    
    const allResources = JSON.parse(localStorage.getItem("allResources"));
    
    allResources.push(newResource);

    console.log(JSON.stringify(allResources));

    localStorage.setItem("allResources", JSON.stringify(allResources));


    // Stores new object in the next index of allResources
    // allResources.push(newResource);
    
}