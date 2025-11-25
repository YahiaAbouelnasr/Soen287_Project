// **********************************************
// DASHBOARD & NOTIFICATIONS CORE LOGIC (DELIVERABLE 2)
// **********************************************
import "/userSafety.js";
import { auth, database } from "../../firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { 
    collection, 
    query, 
    where, 
    onSnapshot, 
    updateDoc, 
    deleteDoc, 
    doc,
    addDoc,
    orderBy,
    limit 
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Global Variables
let currentUserId = null;
let currentUserName = null;

// DOM Element References (Used by ALL views)
const welcomeUser = document.getElementById('welcomeUser');
const notificationBell = document.getElementById('notification-bell');
const notificationCount = document.getElementById('notification-count');
const notificationsPanel = document.getElementById('notifications-panel');
const notificationsList = document.getElementById('notifications-list');

// Admin and Student Elements (may be null depending on the page)
const pendingRequestsList = document.getElementById('pending-requests-list');
const upcomingBookingsList = document.getElementById('upcoming-bookings-list');

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserId = user.uid;
        currentUserName = user.displayName || user.email;

        if (welcomeUser) welcomeUser.textContent = `Welcome, ${currentUserName}!`;

        // Start loading real-time data
        loadNotifications(); 
        
        // Check which page is loaded (Student or Admin)
        const isStudentPage = document.body.id === 'student-page';
        const isAdminPage = document.body.id === 'admin-page';
        
        if (isStudentPage) {
            loadStudentBookings();
        }
        if (isAdminPage) {
            loadPendingRequests();
        }

    } else {
        currentUserId = null;
        if (welcomeUser) welcomeUser.textContent = `Welcome!`;
        // UI cleanup handled by safety scripts redirecting to login.
    }
});

// Simple Notification Toggle
function toggleNotifications() {
    if (notificationsPanel) {
        notificationsPanel.style.display = (notificationsPanel.style.display === 'block' ? 'none' : 'block');
    }
}
if (notificationBell) {
    notificationBell.addEventListener('click', toggleNotifications);
}

/**
 * Loads notifications for the current user in real-time.
 * Notifications are stored in a subcollection under the user's document.
 */
function loadNotifications() {
    if (!currentUserId || !notificationsList) return; 

    // Collection reference: users/{userId}/notifications
    const notifsRef = collection(database, `users/${currentUserId}/notifications`);
    
    // Query to get the latest 5 notifications, newest first
    const q = query(notifsRef, orderBy("timestamp", "desc"), limit(5));

    onSnapshot(q, (snapshot) => {
        const notifArray = [];
        let unreadCount = 0;
        
        snapshot.forEach((doc) => {
            const notif = { id: doc.id, ...doc.data() };
            notifArray.push(notif);
            if (!notif.read) {
                unreadCount++;
            }
        });

        renderNotifications(notifArray, unreadCount);
    }, (error) => {
        console.error("Error fetching notifications:", error);
    });
}

/**
 * Renders the notification list and updates the bell count.
 */
function renderNotifications(notifArray, unreadCount) {
    notificationsList.innerHTML = ''; 

    if (notifArray.length === 0) {
        notificationsList.innerHTML = '<li style="padding: 12px 16px; color: #6b7280; font-size: 14px;">No new notifications.</li>';
        if (notificationCount) notificationCount.style.display = 'none';
        return;
    }

    notifArray.forEach(notif => {
        const li = document.createElement('li');
        li.style.background = notif.read ? 'none' : '#f0f0ff'; // Light background for unread
        li.innerHTML = `
            <p class="dropdown-list-title" style="font-weight: ${notif.read ? 500 : 700};">${notif.title}</p>
            <p class="dropdown-list-body">${notif.body}</p>
        `;
        notificationsList.appendChild(li);
    });
    
    if (notificationCount) {
        notificationCount.innerText = unreadCount;
        notificationCount.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
}

/**
 * Creates a notification document in Firestore (Called by Admin actions).
 */
async function createNotificationInDb(targetUserId, title, body) {
    if (!targetUserId) return console.error("Cannot create notification: Missing target user ID.");

    try {
        await addDoc(collection(database, `users/${targetUserId}/notifications`), {
            title: title,
            body: body,
            timestamp: new Date().toISOString(),
            read: false
        });
        console.log(`Notification sent to user ${targetUserId}`);
    } catch (error) {
        console.error("Error creating notification:", error);
    }
}

/**
 * Loads the student's upcoming bookings.
 */
function loadStudentBookings() {
    if (!currentUserId || !upcomingBookingsList) return;

    // Query: bookings WHERE userId == currentUserId (and assume status is not 'rejected' for display)
    const bookingsRef = collection(database, 'bookings');
    const q = query(bookingsRef, where('userId', '==', currentUserId), orderBy("date"));

    onSnapshot(q, (snapshot) => {
        const bookingArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderStudentBookings(bookingArray);
    }, (error) => {
        console.error("Error fetching student bookings:", error);
    });
}

/**
 * Renders the student bookings list.
 */
function renderStudentBookings(bookingArray) {
    if (!upcomingBookingsList) return;

    upcomingBookingsList.innerHTML = '';
    
    if (bookingArray.length === 0) {
        upcomingBookingsList.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #6b7280; padding: 16px;">You have no upcoming bookings.</td></tr>';
        return;
    }

    bookingArray.forEach(booking => {
        const tr = document.createElement('tr');
        
        let statusBadge = `<span class="badge" style="background: #f0f0f0; color: #444;">${booking.status}</span>`;
        if (booking.status === 'approved') statusBadge = `<span class="badge" style="background: #d9fdd3; color: #16a34a;">Approved</span>`;
        if (booking.status === 'rejected') statusBadge = `<span class="badge" style="background: #fdd3d3; color: #ef4444;">Rejected</span>`;
        
        const isCancellable = booking.status === 'pending';

        tr.innerHTML = `
            <td>${booking.resourceName || 'Resource'}</td>
            <td>${booking.date} at ${booking.start} - ${booking.end}</td>
            <td>${statusBadge}</td>
            <td>
                <button data-id="${booking.id}" class="btn btn-danger cancel-btn" style="padding: 4px 8px; font-size: 12px;" ${!isCancellable ? 'disabled' : ''}>
                    Cancel
                </button>
            </td>
        `;
        upcomingBookingsList.appendChild(tr);
    });
}

/**
 * Handles the database action for canceling a pending booking.
 */
async function handleCancelBooking(bookingId) {
    if (!bookingId) return;

    try {
        const docRef = doc(database, 'bookings', bookingId);
        await deleteDoc(docRef); 
        console.log("Booking successfully cancelled (deleted).");
    } catch (error) {
        console.error("Error cancelling booking:", error);
    }
}

// Global click handler for the Student Booking List
if (upcomingBookingsList) {
    upcomingBookingsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('cancel-btn') && !event.target.disabled) {
            const bookingId = event.target.getAttribute('data-id');
            if (bookingId) {
                // This is where a custom confirmation modal would go!
                handleCancelBooking(bookingId);
            }
        }
    });
}

/**
 * Loads pending booking requests.
 */
function loadPendingRequests() {
    if (!pendingRequestsList) return;

    // Query: bookings WHERE status == 'pending'
    const bookingsRef = collection(database, 'bookings');
    const q = query(bookingsRef, where('status', '==', 'pending'), orderBy("date"));

    onSnapshot(q, (snapshot) => {
        const requestArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderPendingRequests(requestArray);
    }, (error) => {
        console.error("Error fetching pending requests:", error);
    });
}

/**
 * Renders the list of pending requests for the Admin.
 */
function renderPendingRequests(requestArray) {
    if (!pendingRequestsList) return;
    
    pendingRequestsList.innerHTML = ''; 

    if (requestArray.length === 0) {
        pendingRequestsList.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #6b7280; padding: 16px;">No pending requests.</td></tr>';
        return;
    }

    requestArray.forEach(request => {
        const tr = document.createElement('tr');
        // Truncate User ID for display security and length
        const userIdDisplay = request.userId ? request.userId.substring(0, 5) + '...' : 'Unknown';
        const userNameId = `${request.userName || 'User'} (ID: ${userIdDisplay})`;
        
        tr.innerHTML = `
            <td>${request.resourceName || 'Resource'}</td>
            <td>${userNameId}</td>
            <td>${request.date} at ${request.start} - ${request.end}</td>
            <td>
                <button data-id="${request.id}" data-user-id="${request.userId}" data-resource="${request.resourceName}" data-date="${request.date}" class="btn approve-btn" style="padding: 4px 8px; font-size: 12px; background: #16a34a; border-color: #16a34a;">
                    Approve
                </button>
                <button data-id="${request.id}" data-user-id="${request.userId}" data-resource="${request.resourceName}" data-date="${request.date}" class="btn btn-danger reject-btn" style="padding: 4px 8px; font-size: 12px; margin-left: 4px;">
                    Reject
                </button>
            </td>
        `;
        pendingRequestsList.appendChild(tr);
    });
}

// Admin Action Handlers
async function handleApproveRequest(requestId, userId, resourceName, date) {
    if (!requestId || !userId) return;
    try {
        const docRef = doc(database, 'bookings', requestId);
        await updateDoc(docRef, {
            status: 'approved',
            adminId: currentUserId,
            approvedAt: new Date().toISOString()
        });
        
        createNotificationInDb(
            userId, 
            "Booking Approved!", 
            `${resourceName} is confirmed for ${date}.`
        );
        console.log(`Request ${requestId} approved.`);
    } catch (error) {
        console.error("Error approving request:", error);
    }
}

async function handleRejectRequest(requestId, userId, resourceName, date) {
    if (!requestId || !userId) return;
    try {
        const docRef = doc(database, 'bookings', requestId);
        await updateDoc(docRef, {
            status: 'rejected',
            adminId: currentUserId,
            rejectedAt: new Date().toISOString()
        });
        
        createNotificationInDb(
            userId, 
            "Booking Rejected", 
            `${resourceName} on ${date} was rejected due to unavailability or policy.`
        );
        
        console.log(`Request ${requestId} rejected.`);
    } catch (error) {
        console.error("Error rejecting request:", error);
    }
}

// Global click handler for the Admin Pending Requests List
if (pendingRequestsList) {
    pendingRequestsList.addEventListener('click', function(event) {
        const button = event.target;
        const requestId = button.getAttribute('data-id');
        const userId = button.getAttribute('data-user-id');
        const resourceName = button.getAttribute('data-resource');
        const date = button.getAttribute('data-date');
        
        if (button.classList.contains('approve-btn')) {
            handleApproveRequest(requestId, userId, resourceName, date);
        }

        if (button.classList.contains('reject-btn')) {
            handleRejectRequest(requestId, userId, resourceName, date);
        }
    });
}
