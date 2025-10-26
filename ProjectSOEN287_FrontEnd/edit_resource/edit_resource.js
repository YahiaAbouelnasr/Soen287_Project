import { getResources, getResourceById, updateResource } from '../shared/shared_data.js';

const select = document.getElementById('resourceSelect');
const form   = document.getElementById('editForm');

const idEl   = document.getElementById('id');
const nameEl = document.getElementById('name');
const typeEl = document.getElementById('type');
const capEl  = document.getElementById('capacity');
const locEl  = document.getElementById('location');
const notesEl= document.getElementById('notes');

// populate dropdown
const resources = getResources();
resources.forEach(r => {
  const opt = document.createElement('option');
  opt.value = r.id;
  opt.textContent = r.name;
  select.appendChild(opt);
});

// load first by default
if (resources.length) load(resources[0].id);

select.addEventListener('change', () => load(select.value));

function load(id) {
  const r = getResourceById(id);
  if (!r) return;
  idEl.value = r.id;
  nameEl.value = r.name;
  typeEl.value = r.type;
  capEl.value = r.capacity;
  locEl.value = r.location || '';
  notesEl.value = r.notes || '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const ok = updateResource({
    id: idEl.value,
    name: nameEl.value,
    type: typeEl.value,
    capacity: capEl.value,
    location: locEl.value,
    notes: notesEl.value
  });
  if (ok) location.href = '../main/index.html';
});
