
import { addResource } from '../shared/shared_data.js';

const form = document.getElementById('createForm');

function newId() {
return 'id_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const resource = {
    id: newId(),
    name: document.getElementById('name').value.trim(),
    type: document.getElementById('type').value.trim(),
    capacity: Number(document.getElementById('capacity').value || 0),
    location: document.getElementById('location').value.trim(),
    notes: document.getElementById('notes').value.trim(),
  };

  addResource(resource);
  window.location.href = '../main/index.html';
});


