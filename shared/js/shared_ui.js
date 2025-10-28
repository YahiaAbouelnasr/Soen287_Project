export function escapeHtml(str = '') {
  return String(str);
}

export function renderResourcesTable(tbody, resources) {
  tbody.innerHTML = '';

  if (!resources.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; color:#666;">No resources yet</td>
      </tr>`;
    return;
  }

  for (const r of resources) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(r.name)}</td>
      <td>${escapeHtml(r.type)}</td>
      <td>${escapeHtml(String(r.capacity))}</td>
      <td>${escapeHtml(r.location)}</td>
      <td>${escapeHtml(r.notes || '')}</td>
    `;
    tbody.appendChild(tr);
  }
}
