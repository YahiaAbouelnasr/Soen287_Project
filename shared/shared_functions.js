// Displays resource details 
// (show action is specific to resource_management, so always do false)
export function getResourceHtml(resource, showActions = true) {
    return `
    <div class="resource-card">
        <div class="resource-content">
            <h3 class="resource-title-row">
                <span>${resource.name}</span>
                <span class="status-badge ${resource.availability === "Available" ? "available" : "unavailable"}">
                    ${resource.availability}
                </span>
            </h3>
            <p>Type: ${resource.type}</p>
            <p>Description: ${resource.description}</p>
            <p>Capacity: ${resource.capacity || "—"}</p>
            <img src="${resource.image}" alt="${resource.name}">
        </div>

        ${showActions ? `
        <div class="resource-actions">
            <a href="../edit_resource/edit_resource.html?resourceId=${resource.id}">Edit</a>
            <a href="../remove_resource/remove_resource.html?resourceId=${resource.id}">Delete</a> 
        </div>` : ""}
    </div>
    `;
}
 // (can change resource-card to something else in your own code)


