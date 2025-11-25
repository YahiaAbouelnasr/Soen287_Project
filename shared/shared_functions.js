// Displays resource details 
// (show action is specific to resource_management, so always do false)
export function getResourceHtml(resource, showActions = true, isBooking = false) {
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
            <a class="edit-btn" data-id="${resource.id}">Edit</a>
            <a class="delete-btn" data-id="${resource.id}">Delete</a>
        </div>` : ""}

         ${isBooking && resource.availability === "Available" ? `
        <div class="resource-actions">
            <a class="booking-btn" data-id="${resource.id}">Book</a>
        </div>` : ""}
    </div>
    `;
}
 // (can change resource-card to something else in your own code)

 // ANA: IF NO ONE NEEDS THIS FOR RESOURCE, WILL MOVE THIS INTO MY OWN


