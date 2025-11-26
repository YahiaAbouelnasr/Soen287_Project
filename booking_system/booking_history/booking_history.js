import "/userSafety.js";

import { getBookings, getResourcesFromDB, deleteBooking } from "../shared/shared_data.js";
import { auth } from "/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const whoInput  = document.getElementById("who");      
const filterBtn = document.getElementById("filterBtn");
const allBtn    = document.getElementById("allBtn");
const tbody     = document.getElementById("tbody");

let currentUserEmail = null;
let myBookings = []; // cache


async function buildResourceNameMap() {
  const resources = await getResourcesFromDB(); // from Firestore
  return Object.fromEntries(resources.map(r => [r.id, r.name]));
}


async function render(list) {
  const nameMap = await buildResourceNameMap();
  tbody.innerHTML = "";

  if (!list.length) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 7;
    td.style.textAlign = "center";
    td.textContent = "No bookings found";
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  list.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));

  for (const b of list) {
    const tr = document.createElement("tr");
    const displayName = nameMap[b.resourceId] ?? b.resourceName ?? "(Unknown)";

    tr.innerHTML = `
      <td>${b.who}</td>
      <td>${displayName}</td>
      <td>${b.date}</td>
      <td>${b.start}</td>
      <td>${b.end}</td>
      <td>${b.purpose}</td>
      <td>
        <button class="btn danger" data-id="${b.id}">Cancel</button>
      </td>
    `;

    tr.querySelector("button[data-id]").addEventListener("click", () => {
      cancelBooking(b.id);
    });

    tbody.appendChild(tr);
  }
}

async function reloadMyBookings() {
  if (!currentUserEmail) return;

  const all = await getBookings();
  myBookings = all.filter(b => b.who === currentUserEmail); 
  await render(myBookings);
}

async function cancelBooking(id) {
  const ok = confirm("Cancel this booking?");
  if (!ok) return;

  await deleteBooking(id);
  await reloadMyBookings();
}

async function currentFilter() {
  const term = whoInput.value.trim().toLowerCase();

  if (!term) {
    await render(myBookings);
    return;
  }

  const filtered = myBookings.filter(b =>
    (b.who ?? "").toLowerCase().includes(term) ||      
    (b.purpose ?? "").toLowerCase().includes(term) ||
    (b.date ?? "").toLowerCase().includes(term) ||
    (b.start ?? "").toLowerCase().includes(term) ||
    (b.end ?? "").toLowerCase().includes(term)
  );

  await render(filtered);
}


filterBtn.addEventListener("click", () => {
  currentFilter();
});

allBtn.addEventListener("click", async () => {
  whoInput.value = "";
  await render(myBookings);
});

whoInput.addEventListener("keydown", e => {
  if (e.key === "Enter") currentFilter();
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please log in first.");
    window.location.href = "/index.html";
    return;
  }

  currentUserEmail = user.email;
  await reloadMyBookings();
});
