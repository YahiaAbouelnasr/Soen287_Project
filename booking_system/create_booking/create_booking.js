import "/userSafety.js"; 

import { getResourcesFromDB, getBookings, addBooking } from "../shared/shared_data.js";
import { auth } from "/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const sel       = document.getElementById("resourceId");
const msg       = document.getElementById("msg");
const whoEl     = document.getElementById("who");
const dateEl    = document.getElementById("date");
const startEl   = document.getElementById("start");
const endEl     = document.getElementById("end");
const purposeEl = document.getElementById("purpose");
const saveBtn   = document.getElementById("saveBtn");

let currentUser = null; // logged-in user


onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Please log in first.");
    window.location.href = "/index.html";
    return;
  }

  currentUser = user;

  
  if (whoEl) {
    whoEl.value = user.email;
    whoEl.readOnly = true;
  }
});


async function renderResources() {
  sel.innerHTML = "";

  // firestore ressource
  const resources = await getResourcesFromDB();

  if (!resources.length) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No resources yet (create one first)";
    sel.appendChild(opt);

    sel.disabled = true;
    saveBtn.disabled = true;
    msg.textContent = "Go back and create a resource first.";
    return;
  }

  for (const r of resources) {
    const opt = document.createElement("option");
    opt.value = r.id; // firestore document id
    opt.textContent = `${r.name} (${r.type || "resource"})`;
    sel.appendChild(opt);
  }

  sel.disabled = false;
  saveBtn.disabled = false;
  msg.textContent = "";
}

renderResources();

function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}


saveBtn.addEventListener("click", async () => {
  msg.textContent = "";

  if (!currentUser) {
    msg.textContent = "You must be logged in to create a booking.";
    return;
  }

  const who        = currentUser.email;   // use logged-in user’s email
  const resourceId = sel.value;
  const date       = dateEl.value;
  const start      = startEl.value;
  const end        = endEl.value;
  const purpose    = purposeEl.value.trim();

  if (!resourceId)     return (msg.textContent = "Please select a resource.");
  if (!date)           return (msg.textContent = "Please choose a date.");
  if (!start || !end)  return (msg.textContent = "Please choose start and end time.");
  if (!purpose)        return (msg.textContent = "Please enter a purpose.");

  const startMin = timeToMinutes(start);
  const endMin   = timeToMinutes(end);

  if (endMin <= startMin) {
    msg.textContent = "End time must be after start time.";
    return;
  }

  
  const list     = await getBookings();
  const sameDay  = list.filter(b => b.resourceId === resourceId && b.date === date);
  const conflict = sameDay.some(b => {
    const s = timeToMinutes(b.start);
    const e = timeToMinutes(b.end);
    return Math.max(s, startMin) < Math.min(e, endMin);
  });

  if (conflict) {
    msg.textContent = "That time conflicts with an existing booking.";
    return;
  }

  const booking = {
    who,
    resourceId,
    date,
    start,
    end,
    purpose,
    status: "pending"
  };

  await addBooking(booking);

  msg.textContent = "Booking saved ✔ (pending approval)";

 
  dateEl.value    = "";
  startEl.value   = "";
  endEl.value     = "";
  purposeEl.value = "";
});
