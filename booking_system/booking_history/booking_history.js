import "/userSafety.js";
import {
  getBookings,
  getResourcesFromDB,   // Firestore resources
  deleteBooking
} from '../shared/shared_data.js';

const whoInput  = document.getElementById('who');
const filterBtn = document.getElementById('filterBtn');
const allBtn    = document.getElementById('allBtn');
const tbody     = document.getElementById('tbody');


const CURRENT_USER =
  (localStorage.getItem('currentUserEmail')  || localStorage.getItem('currentUserName')|| localStorage.getItem('email')|| ''
  ).trim().toLowerCase();


if (CURRENT_USER) {
  whoInput.value = CURRENT_USER;
  whoInput.readOnly = true;   
}

// firestore 
async function buildResourceNameMap() {
  const resources = await getResourcesFromDB();
  return Object.fromEntries(resources.map(r => [r.id, r.name]));
}

async function render(list) {
  const nameMap = await buildResourceNameMap();
  tbody.innerHTML = '';

  if (!list.length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 7;
    td.style.textAlign = 'center';
    td.textContent = 'No bookings found';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  list.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));

  for (const b of list) {
    const tr = document.createElement('tr');
    const displayName = nameMap[b.resourceId] ?? b.resourceName ?? '(Unknown)';

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

    tr.querySelector('button[data-id]').addEventListener('click', () => {
      cancelBooking(b.id);
    });

    tbody.appendChild(tr);
  }
}

async function cancelBooking(id) {
  const ok = confirm('Cancel this booking?');
  if (!ok) return;

  await deleteBooking(id);
  await currentFilter();
}


async function currentFilter() {
  const term = whoInput.value.trim().toLowerCase();
  const all  = await getBookings();

  
  const mine = CURRENT_USER
    ? all.filter(b => (b.who ?? '').toLowerCase() === CURRENT_USER)
    : all; 

  const finalList = term
    ? mine.filter(b => (b.who ?? '').toLowerCase().includes(term))
    : mine;

  await render(finalList);
}

filterBtn.addEventListener('click', () => {
  currentFilter();
});

allBtn.addEventListener('click', async () => {
  if (CURRENT_USER) whoInput.value = CURRENT_USER;
  await currentFilter();
});

whoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') currentFilter();
});

(async () => {
  await currentFilter();
})();
