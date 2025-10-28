// --- HARD-CODED DATA ---

// Data for student's upcoming bookings
const studentBookings = [
  { id: 1, room: "Study Room 101", time: "October 28, 2025 at 2:00 PM" },
  { id: 2, room: "Music Room 3", time: "October 29, 2025 at 5:00 PM" },
];

// Data for admin's pending requests
const pendingRequests = [
  {
    id: 1,
    room: "Group Project Room B",
    student: "Alex Smith (ID: 123456)",
    time: "October 29, 2025 at 10:00 AM",
  },
  {
    id: 2,
    room: "Mac Lab (210)",
    student: "Jane Doe (ID: 654321)",
    time: "October 30, 2025 at 1:00 PM",
  },
];

// Data for notifications
const notifications = [
  {
    id: 1,
    title: "Booking Confirmed!",
    body: "Study Room 101 is booked for Oct 28.",
  },
  {
    id: 2,
    title: "Resource Maintenance",
    body: "The 3D printers will be down for maintenance on Oct 27.",
  },
  {
    id: 3,
    title: "New Booking Request",
    body: "Admin: A new request for Group Room B.",
  },
];

// --- DOM ELEMENT REFERENCES ---
// Get all the elements we need to interact with
const studentBtn = document.getElementById("student-view-btn");
const adminBtn = document.getElementById("admin-view-btn");
const studentDashboard = document.getElementById("student-dashboard");
const adminDashboard = document.getElementById("admin-dashboard");

// const notificationBell = document.getElementById('notification-bell');
// const notificationCount = document.getElementById('notification-count');
// const notificationsPanel = document.getElementById('notifications-panel');

const upcomingBookingsList = document.getElementById("upcoming-bookings-list");
const pendingRequestsList = document.getElementById("pending-requests-list");

// const notificationsList = document.getElementById('notifications-list');

// --- FUNCTIONS ---

// Function to show the student dashboard
function showStudentView() {
  studentDashboard.style.display = "block";
  adminDashboard.style.display = "none";
  studentBtn.classList.add("active");
  adminBtn.classList.remove("active");
}

// Function to show the admin dashboard
function showAdminView() {
  studentDashboard.style.display = "none";
  adminDashboard.style.display = "block";
  studentBtn.classList.remove("active");
  adminBtn.classList.add("active");
}

// Function to toggle the notifications panel
function toggleNotifications() {
  if (
    notificationsPanel.style.display === "none" ||
    notificationsPanel.style.display === ""
  ) {
    notificationsPanel.style.display = "block";
  } else {
    notificationsPanel.style.display = "none";
  }
}

// Function to load student bookings into the table
function loadStudentBookings() {
  upcomingBookingsList.innerHTML = ""; // Clear existing table body

  if (studentBookings.length === 0) {
    upcomingBookingsList.innerHTML =
      '<tr><td colspan="3" style="text-align: center; color: #6b7280; padding: 16px;">You have no upcoming bookings.</td></tr>';
    return;
  }

  studentBookings.forEach((booking) => {
    const tr = document.createElement("tr");
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
}

// Function to load pending requests into the admin table
function loadPendingRequests() {
  pendingRequestsList.innerHTML = ""; // Clear existing table body

  if (pendingRequests.length === 0) {
    pendingRequestsList.innerHTML =
      '<tr><td colspan="4" style="text-align: center; color: #6b7280; padding: 16px;">No pending requests.</td></tr>';
    return;
  }

  pendingRequests.forEach((request) => {
    const tr = document.createElement("tr");
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
}

// Function to load notifications into the panel
function loadNotifications() {
  notificationsList.innerHTML = ""; // Clear list

  if (notifications.length === 0) {
    notificationsList.innerHTML =
      '<li style="padding: 12px 16px; color: #6b7280; font-size: 14px;">No new notifications.</li>';
    notificationCount.style.display = "none";
    return;
  }

  notifications.forEach((notif) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <p class="dropdown-list-title">${notif.title}</p>
            <p class="dropdown-list-body">${notif.body}</p>
        `;
    notificationsList.appendChild(li);
  });

  // Update and show the notification count
  notificationCount.innerText = notifications.length;
  notificationCount.style.display = "inline-block"; // Use 'inline-block' for badge
}

// --- EVENT LISTENERS ---
document.addEventListener("DOMContentLoaded", () => {
  // View toggles
  studentBtn.addEventListener("click", showStudentView);
  adminBtn.addEventListener("click", showAdminView);

  // Notification bell
  //   notificationBell.addEventListener("click", toggleNotifications);

  // Handle clicks on the "Cancel" buttons
  upcomingBookingsList.addEventListener("click", function (event) {
    if (event.target.classList.contains("cancel-btn")) {
      const bookingId = event.target.getAttribute("data-id");
      console.log("Cancel booking with ID:", bookingId);
      // Remove the table row
      event.target.closest("tr").remove();
    }
  });

  // Handle clicks on "Approve/Reject" buttons
  pendingRequestsList.addEventListener("click", function (event) {
    const button = event.target;
    const requestId = button.getAttribute("data-id");

    if (button.classList.contains("approve-btn")) {
      console.log("Approve request with ID:", requestId);
      // Remove the table row
      button.closest("tr").remove();
    }

    if (button.classList.contains("reject-btn")) {
      console.log("Reject request with ID:", requestId);
      // Remove the table row
      button.closest("tr").remove();
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
