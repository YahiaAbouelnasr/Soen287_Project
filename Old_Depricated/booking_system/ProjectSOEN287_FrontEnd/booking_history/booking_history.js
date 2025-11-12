import { getBookings, saveBookings, getResources } from '../shared/shared_data.js';

const whoInput  = document.getElementById('who');
const filterBtn = document.getElementById('filterBtn');
const allBtn    = document.getElementById('allBtn');
const tbody     = document.getElementById('tbody');


function buildResourceNameMap() {
  return Object.fromEntries(getResources().map(r => [r.id, r.name]));
}

function render(list) {
  const nameMap = buildResourceNameMap();
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

function cancelBooking(id) {
  const ok = confirm('Cancel this booking?');
  if (!ok) return;
  const list = getBookings().filter(b => b.id !== id);
  saveBookings(list);
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

filterBtn.addEventListener('click', currentFilter);
allBtn.addEventListener('click', () => {
  whoInput.value = '';
  render(getBookings());
});
whoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') currentFilter();
});

render(getBookings());
