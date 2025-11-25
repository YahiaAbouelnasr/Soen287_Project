// --- HARD-CODED DATA (for Deliverable 1) ---
// This data is used by both the student and admin views.
import "/userSafety.js";
import {auth} from "../firebase.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    const name = user.displayName || "Student";
    document.getElementById("welcomeUser").textContent = `Welcome, ${name}`;
})
const studentBookings = [
    { id: 1, room: 'Study Room 101', time: 'October 28, 2025 at 2:00 PM' },
    { id: 2, room: 'Music Room 3', time: 'October 29, 2025 at 5:00 PM' }
];

const pendingRequests = [
    { id: 1, room: 'Group Project Room B', student: 'Alex Smith (ID: 123456)', time: 'October 29, 2025 at 10:00 AM' },
    { id: 2, room: 'Mac Lab (210)', student: 'Jane Doe (ID: 654321)', time: 'October 30, 2025 at 1:00 PM' }
];

const notifications = [
    { id: 1, title: 'Booking Confirmed!', body: 'Study Room 101 is booked for Oct 28.' },
    { id: 2, title: 'Resource Maintenance', body: 'The 3D printers will be down for maintenance on Oct 27.' },
    { id: 3, title: 'New Booking Request', body: 'Admin: A new request for Group Room B.' }
];


// DOM Element References for Notifications (Used by BOTH dashboards)
const notificationBell = document.getElementById('notification-bell');
const notificationCount = document.getElementById('notification-count');
const notificationsPanel = document.getElementById('notifications-panel');
const notificationsList = document.getElementById('notifications-list');

/**
 * Toggles the visibility of the notification panel.
 */
function toggleNotifications() {
    if (notificationsPanel) {
        if (notificationsPanel.style.display === 'none' || notificationsPanel.style.display === '') {
            notificationsPanel.style.display = 'block';
        } else {
            notificationsPanel.style.display = 'none';
        }
    }
}

/**
 * Loads hard-coded notifications into the panel.
 */
function loadNotifications() {
    if (!notificationsList) return; 

    notificationsList.innerHTML = ''; // Clear list

    if (notifications.length === 0) {
        notificationsList.innerHTML = '<li style="padding: 12px 16px; color: #6b7280; font-size: 14px;">No new notifications.</li>';
        if (notificationCount) notificationCount.style.display = 'none';
        return;
    }

    notifications.forEach(notif => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p class="dropdown-list-title">${notif.title}</p>
            <p class="dropdown-list-body">${notif.body}</p>
        `;
        notificationsList.appendChild(li);
    });
    
    // Update and show the notification count
    if (notificationCount) {
        notificationCount.innerText = notifications.length;
        notificationCount.style.display = 'inline-block';
    }
}

// DOM Element Reference for Student View
const upcomingBookingsList = document.getElementById('upcoming-bookings-list');

/**
 * Loads student bookings into the table (Student Dashboard).
 */
function loadStudentBookings() {
    if (!upcomingBookingsList) return;

    upcomingBookingsList.innerHTML = ''; 
    
    if (studentBookings.length === 0) {
        upcomingBookingsList.innerHTML = '<tr><td colspan="3" style="text-align: center; color: #6b7280; padding: 16px;">You have no upcoming bookings.</td></tr>';
        return;
    }

    studentBookings.forEach(booking => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${booking.room}</td>
            <td>${booking.time}</td>
            <td>
                <button data-id="${booking.id}" class="btn btn-danger cancel-btn" style="padding: 4px 8px; font-size: 12px;">
                    Cancel
                </button>
            </td>
        `;
        upcomingBookingsList.appendChild(tr);
    });
    
    // Add event listener for the "Cancel" button action
    upcomingBookingsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('cancel-btn')) {
            const bookingId = event.target.getAttribute('data-id');
            console.log('Cancel booking with ID:', bookingId);
            // Frontend action: Remove the table row visually
            event.target.closest('tr').remove(); 
            // NOTE: In Deliverable 2, this will send a DELETE/UPDATE request to the backend.
        }
    });
}


// DOM Element Reference for Admin View
const pendingRequestsList = document.getElementById('pending-requests-list');

/**
 * Loads pending requests into the table (Admin Dashboard).
 */
function loadPendingRequests() {
    if (!pendingRequestsList) return; 

    pendingRequestsList.innerHTML = ''; 

    if (pendingRequests.length === 0)
    {
        pendingRequestsList.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #6b7280; padding: 16px;">No pending requests.</td></tr>';
        return;
    }

    pendingRequests.forEach(request => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${request.room}</td>
            <td>${request.student}</td>
            <td>${request.time}</td>
            <td>
                <button data-id="${request.id}" class="btn approve-btn" style="padding: 4px 8px; font-size: 12px; background: #16a34a; border-color: #16a34a;">
                    Approve
                </button>
                <button data-id="${request.id}" class="btn btn-danger reject-btn" style="padding: 4px 8px; font-size: 12px; margin-left: 4px;">
                    Reject
                </button>
            </td>
        `;
        pendingRequestsList.appendChild(tr);
    });
    
    // Add event listener for the "Approve/Reject" buttons
    pendingRequestsList.addEventListener('click', function(event) {
        const button = event.target;
        const requestId = button.getAttribute('data-id');
        
        if (button.classList.contains('approve-btn')) {
            console.log('Approve request with ID:', requestId);
            button.closest('tr').remove();
            // NOTE: In Deliverable 2, this will send an UPDATE request to the backend.
        }

        if (button.classList.contains('reject-btn')) {
            console.log('Reject request with ID:', requestId);
            button.closest('tr').remove();
            // NOTE: In Deliverable 2, this will send an UPDATE request to the backend.
        }
    });
}



document.addEventListener('DOMContentLoaded', () => {
    // Check which page we are on based on the unique body IDs
    const isStudentDashboard = document.body.id === 'student-page';
    const isAdminDashboard = document.body.id === 'admin-page';

    // 1. Load Notifications (runs on both pages)
    if (notificationBell) {
        notificationBell.addEventListener('click', toggleNotifications);
    }
    loadNotifications();

    // 2. Load Page Specific Content
    if (isStudentDashboard) {
        // Only run student functions if on the student page
        console.log("Loading Student Dashboard Content...");
        loadStudentBookings();
    } 
    
    if (isAdminDashboard) {
        // Only run admin functions if on the admin page
        console.log("Loading Admin Dashboard Content...");
        loadPendingRequests();
    }
});
