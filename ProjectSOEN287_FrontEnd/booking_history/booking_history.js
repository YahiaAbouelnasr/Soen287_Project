import { getBookings, saveBookings } from '../shared/shared_data.js';

const pad = n => String(n).padStart(2, '0');
const safe = s => String(s ?? '').replace(/[&<>"']/g, m => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[m]));

// --- DOM ---
const whoInput  = document.getElementById('who');
const filterBtn = document.getElementById('filterBtn');
const allBtn    = document.getElementById('allBtn');
const tbody     = document.getElementById('tbody');

// --- render ---
function render(list) {
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

  // sort by date then start time
  list.sort((a,b) => (a.date+b.start).localeCompare(b.date+b.start));

  for (const b of list) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${safe(b.who)}</td>
      <td>${safe(b.resourceName ?? b.resourceId)}</td>
      <td>${safe(b.date)}</td>
      <td>${safe(b.start)}</td>
      <td>${safe(b.end)}</td>
      <td>${safe(b.purpose)}</td>
      <td>
        <button class="btn danger" data-id="${safe(b.id)}">Cancel</button>
      </td>
    `;

    // attach cancel handler
    tr.querySelector('button[data-id]').addEventListener('click', () => {
      cancelBooking(b.id);
    });

    tbody.appendChild(tr);
  }
}

function cancelBooking(id) {
  const ok = confirm('Cancel this booking?');
  if (!ok) return;
  const list = getBookings().filter(b => b.id !== id);
  saveBookings(list);
  // re-render with current filter (if any)
  currentFilter();
}

function currentFilter() {
  const term = whoInput.value.trim().toLowerCase();
  const all  = getBookings();
  if (!term) {
    render(all);
  } else {
    render(all.filter(b => (b.who ?? '').toLowerCase().includes(term)));
  }
}

// --- events ---
filterBtn.addEventListener('click', currentFilter);
allBtn.addEventListener('click', () => {
  whoInput.value = '';
  render(getBookings());
});
whoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') currentFilter();
});

// --- bootstrap ---
render(getBookings());
