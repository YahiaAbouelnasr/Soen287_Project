// --- HARD-CODED DATA (for Deliverable 1) ---

// Data for student's upcoming bookings
const studentBookings = [
    { id: 1, room: 'Study Room 101', time: 'October 28, 2025 at 2:00 PM' },
    { id: 2, room: 'Music Room 3', time: 'October 29, 2025 at 5:00 PM' }
];

// Data for admin's pending requests
const pendingRequests = [
    { id: 1, room: 'Group Project Room B', student: 'Alex Smith (ID: 123456)', time: 'October 29, 2025 at 10:00 AM' },
    { id: 2, room: 'Mac Lab (210)', student: 'Jane Doe (ID: 654321)', time: 'October 30, 2025 at 1:00 PM' }
];

// Data for notifications
const notifications = [
    { id: 1, title: 'Booking Confirmed!', body: 'Study Room 101 is booked for Oct 28.' },
    { id: 2, title: 'Resource Maintenance', body: 'The 3D printers will be down for maintenance on Oct 27.' },
    { id: 3, title: 'New Booking Request', body: 'Admin: A new request for Group Room B.' }
];


// --- DOM ELEMENT REFERENCES ---
// Get all the elements we need to interact with
const studentBtn = document.getElementById('student-view-btn');
const adminBtn = document.getElementById('admin-view-btn');
const studentDashboard = document.getElementById('student-dashboard');
const adminDashboard = document.getElementById('admin-dashboard');

const notificationBell = document.getElementById('notification-bell');
const notificationCount = document.getElementById('notification-count');
const notificationsPanel = document.getElementById('notifications-panel');

const upcomingBookingsList = document.getElementById('upcoming-bookings-list');
const pendingRequestsList = document.getElementById('pending-requests-list');
const notificationsList = document.getElementById('notifications-list');

// --- FUNCTIONS ---

// Function to show the student dashboard
function showStudentView() {
    studentDashboard.style.display = 'block';
    adminDashboard.style.display = 'none';
    studentBtn.classList.add('active');
    adminBtn.classList.remove('active');
}

// Function to show the admin dashboard
function showAdminView() {
    studentDashboard.style.display = 'none';
    adminDashboard.style.display = 'block';
    studentBtn.classList.remove('active');
    adminBtn.classList.add('active');
}

// Function to toggle the notifications panel
function toggleNotifications() {
    if (notificationsPanel.style.display === 'none') {
        notificationsPanel.style.display = 'block';
        // When panel is opened, hide the badge
        // notificationCount.style.display = 'none';
    } else {
        notificationsPanel.style.display = 'none';
    }
}

// Function to load student bookings into the list
function loadStudentBookings() {
    upcomingBookingsList.innerHTML = ''; // Clear existing list
    
    if (studentBookings.length === 0) {
        upcomingBookingsList.innerHTML = '<li class="p-6 text-sm text-gray-500">You have no upcoming bookings.</li>';
        return;
    }

    studentBookings.forEach(booking => {
        const li = document.createElement('li');
        li.className = 'p-6 flex justify-between items-center';
        li.innerHTML = `
            <div>
                <p class="font-semibold text-blue-600">${booking.room}</p>
                <p class="text-sm text-gray-600">${booking.time}</p>
            </div>
            <button data-id="${booking.id}" class="cancel-btn px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-full hover:bg-red-200">
                Cancel
            </button>
        `;
        upcomingBookingsList.appendChild(li);
    });
}

// Function to load pending requests into the admin list
function loadPendingRequests() {
    pendingRequestsList.innerHTML = ''; // Clear existing list

    if (pendingRequests.length === 0)
    {
        pendingRequestsList.innerHTML = '<li class="p-6 text-sm text-gray-500">No pending requests.</li>';
        return;
    }

    pendingRequests.forEach(request => {
        const li = document.createElement('li');
        li.className = 'p-6 flex flex-col sm:flex-row justify-between sm:items-center space-y-3 sm:space-y-0';
        li.innerHTML = `
            <div>
                <p class="font-semibold text-blue-600">${request.room}</p>
                <p class="text-sm text-gray-600">Student: ${request.student}</p>
                <p class="text-sm text-gray-600">${request.time}</p>
            </div>
            <div class="flex space-x-2 flex-shrink-0">
                <button data-id="${request.id}" class="approve-btn px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full hover:bg-green-200">
                    Approve
                </button>
                <button data-id="${request.id}" class="reject-btn px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-full hover:bg-red-200">
                    Reject
                </button>
            </div>
        `;
        pendingRequestsList.appendChild(li);
    });
}

// Function to load notifications into the panel
function loadNotifications() {
    notificationsList.innerHTML = ''; // Clear list

    if (notifications.length === 0) {
        notificationsList.innerHTML = '<li class="p-4 text-sm text-gray-500">No new notifications.</li>';
        notificationCount.style.display = 'none';
        return;
    }

    notifications.forEach(notif => {
        const li = document.createElement('li');
        li.className = 'p-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer';
        li.innerHTML = `
            <p class="font-medium text-gray-900">${notif.title}</p>
            <p class="text-gray-500">${notif.body}</p>
        `;
        notificationsList.appendChild(li);
    });
    
    // Update and show the notification count
    notificationCount.innerText = notifications.length;
    notificationCount.style.display = 'flex';
}

// --- EVENT LISTENERS ---
// We must wait for the DOM to be fully loaded before trying to find elements
document.addEventListener('DOMContentLoaded', () => {
    // View toggles
    studentBtn.addEventListener('click', showStudentView);
    adminBtn.addEventListener('click', showAdminView);
    
    // Notification bell
    notificationBell.addEventListener('click', toggleNotifications);

    // Handle clicks on the "Cancel" buttons (using event delegation)
    upcomingBookingsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('cancel-btn')) {
            const bookingId = event.target.getAttribute('data-id');
            console.log('Cancel booking with ID:', bookingId);
            event.target.closest('li').remove();
        }
    });

    // Handle clicks on "Approve/Reject" buttons using event delegation
    pendingRequestsList.addEventListener('click', function(event) {
        const button = event.target;
        const requestId = button.getAttribute('data-id');
        
        if (button.classList.contains('approve-btn')) {
            console.log('Approve request with ID:', requestId);
            button.closest('li').remove();
        }

        if (button.classList.contains('reject-btn')) {
            console.log('Reject request with ID:', requestId);
            button.closest('li').
            remove();
        }
    });


    // --- INITIAL PAGE LOAD ---
    // Load all the data when the page first loads
    loadStudentBookings();
    loadPendingRequests();
    loadNotifications();
    
    // Set the default view
    showStudentView();
});
