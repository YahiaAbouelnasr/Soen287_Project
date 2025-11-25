import { checkUrlLocationOnLoad } from "../main_page/resource_management"

window.addEventListener("load", checkUrlLocationOnLoad);
document.addEventListener("click", handleBookingBtn);

function handleBookingBtn(event){
    // BOOKING btn
    const bookingBtn = event.target.closest(".booking-btn");
     if (bookingBtn) {
        // "Setting up the booking"
        event.preventDefault(); // prevent redirect just in case
        const id = bookingBtn.dataset.id;
        console.log("Edit clicked for resource:", id);
        // booking btn action
        window.location.href = `../../booking_system/create_booking/create_booking.html?resourceId=${id}`;
        return;
    }
}