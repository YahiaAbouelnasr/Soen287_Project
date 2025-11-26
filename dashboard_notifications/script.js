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

// DOM Element References
const welcomeUser = document.getElementById('welcomeUser');
const notificationBell = document.getElementById('notification-bell');
const notificationCount = document.getElementById('notification-count');
const notificationsPanel = document.getElementById('notifications-panel');
const notificationsList = document.getElementById('notifications-list');

const pendingRequestsList = document.getElementById('pending-requests-list');
const upcomingBookingsList = document.getElementById('upcoming-bookings-list');


onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserId = user.uid;
        currentUserName = user.displayName || user.email;

        if (welcomeUser) welcomeUser.textContent = `Welcome, ${currentUserName}!`;

        // Load Data
        loadNotifications(); 
        
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
    }
});

// Toggle Notifications
function toggleNotifications() {
    if (notificationsPanel) {
        notificationsPanel.style.display = (notificationsPanel.style.display === 'block' ? 'none' : 'block');
    }
}
if (notificationBell) {
    notificationBell.addEventListener('click', toggleNotifications);
}

function loadNotifications() {
    if (!currentUserId || !notificationsList) return; 

    const notifsRef = collection(database, `users/${currentUserId}/notifications`);
    const q = query(notifsRef, orderBy("timestamp", "desc"), limit(5));

    onSnapshot(q, (snapshot) => {
        const notifArray = [];
        let unreadCount = 0;
        
        snapshot.forEach((doc) => {
            const notif = { id: doc.id, ...doc.data() };
            notifArray.push(notif);
            if (!notif.read) unreadCount++;
        });

        renderNotifications(notifArray, unreadCount);
    }, (error) => {
        console.error("Error fetching notifications:", error);
    });
}

function renderNotifications(notifArray, unreadCount) {
    notificationsList.innerHTML = ''; 

    if (notifArray.length === 0) {
        notificationsList.innerHTML = '<li style="padding: 12px 16px; color: #6b7280; font-size: 14px;">No new notifications.</li>';
        if (notificationCount) notificationCount.style.display = 'none';
        return;
    }

    notifArray.forEach(notif => {
        const li = document.createElement('li');
        li.style.background = notif.read ? 'none' : '#f0f0ff';
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

async function createNotificationInDb(targetUserId, title, body) {
    if (!targetUserId) return;
    try {
        await addDoc(collection(database, `users/${targetUserId}/notifications`), {
            title: title,
            body: body,
            timestamp: new Date().toISOString(),
            read: false
        });
    } catch (error) {
        console.error("Error creating notification:", error);
    }
}


function loadStudentBookings() {
    if (!currentUserId || !upcomingBookingsList) return;

    const bookingsRef = collection(database, 'bookings');
    const q = query(bookingsRef, where('userId', '==', currentUserId));

    onSnapshot(q, (snapshot) => {
        const bookingArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        bookingArray.sort((a, b) => (a.date > b.date) ? 1 : -1);
        renderStudentBookings(bookingArray);
    }, (error) => {
        console.error("Error fetching student bookings:", error);
    });
}

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
            <td>${booking.date} at ${booking.start}</td>
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

async function handleCancelBooking(bookingId) {
    if (!bookingId) return;
    try {
        const docRef = doc(database, 'bookings', bookingId);
        await deleteDoc(docRef); 
    } catch (error) {
        console.error("Error cancelling booking:", error);
    }
}

if (upcomingBookingsList) {
    upcomingBookingsList.addEventListener('click', function(event) {
        if (event.target.classList.contains('cancel-btn') && !event.target.disabled) {
            const bookingId = event.target.getAttribute('data-id');
            if (bookingId) handleCancelBooking(bookingId);
        }
    });
}

function loadPendingRequests() {
    if (!pendingRequestsList) return;

    const bookingsRef = collection(database, 'bookings');
    const q = query(bookingsRef, where('status', '==', 'pending'));

    onSnapshot(q, (snapshot) => {
        const requestArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        requestArray.sort((a, b) => (a.date > b.date) ? 1 : -1);
        renderPendingRequests(requestArray);
    }, (error) => {
        console.error("Error fetching pending requests:", error);
    });
}

function renderPendingRequests(requestArray) {
    if (!pendingRequestsList) return;
    pendingRequestsList.innerHTML = ''; 

    if (requestArray.length === 0) {
        pendingRequestsList.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #6b7280; padding: 16px;">No pending requests.</td></tr>';
        return;
    }

    requestArray.forEach(request => {
        const tr = document.createElement('tr');
        // Use 'userName' saved during creation
        const userNameId = `${request.userName || ''} (ID: ${request.studentId || "N/A" })`;
        
        tr.innerHTML = `
            <td>${request.resourceName || 'Resource'}</td>
            <td>${userNameId}</td>
            <td>${request.date} at ${request.start}</td>
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

async function handleApproveRequest(requestId, userId, resourceName, date) {
    if (!requestId) return;
    try {
        const docRef = doc(database, 'bookings', requestId);
        await updateDoc(docRef, {
            status: 'approved',
            adminId: currentUserId,
            approvedAt: new Date().toISOString()
        });
        
        if (userId) {
            createNotificationInDb(
                userId, 
                "Booking Approved!", 
                `${resourceName || 'Resource'} is confirmed for ${date}.`
            );
        }
    } catch (error) {
        console.error("Error approving request:", error);
    }
}

async function handleRejectRequest(requestId, userId, resourceName, date) {
    if (!requestId) return;
    try {
        const docRef = doc(database, 'bookings', requestId);
        await updateDoc(docRef, {
            status: 'rejected',
            adminId: currentUserId,
            rejectedAt: new Date().toISOString()
        });
        
        if (userId) {
            createNotificationInDb(
                userId, 
                "Booking Rejected", 
                `${resourceName || 'Resource'} on ${date} was rejected.`
            );
        }
    } catch (error) {
        console.error("Error rejecting request:", error);
    }
}

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
