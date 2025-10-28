
import { getResources, deleteResourceById } from '../../booking_system/ProjectSOEN287_FrontEnd/shared/shared_data.js';
import { escapeHtml } from '../../booking_system/ProjectSOEN287_FrontEnd/shared/shared_ui.js';

const tbody = document.getElementById('removeTbody');

function render() {
  const list = getResources();
  tbody.innerHTML = '';

  if (!list.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color:#666;">No resources yet</td>
      </tr>`;
    return;
  }

  for (const r of list) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(r.name)}</td>
      <td>${escapeHtml(r.type)}</td>
      <td>${escapeHtml(String(r.capacity))}</td>
      <td>${escapeHtml(r.location)}</td>
      <td><button class="btn danger" data-id="${r.id}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  }
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;
  const id = btn.dataset.id;

  if (confirm('Delete this resource?')) {
    deleteResourceById(id);
    render();
  }
});

render();
