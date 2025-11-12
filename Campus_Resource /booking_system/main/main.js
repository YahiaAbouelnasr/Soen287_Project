
import { getResources } from '../shared/shared_data.js';
import { renderResourcesTable } from '../shared/shared_ui.js';
// Anastasia what is ../shared/shared_data.js and ../shared/shared_ui.js (again, ali could have deleted it in OLD commit)

const tbody = document.getElementById('resourcesTbody');

function render() {
  renderResourcesTable(tbody, getResources());
}

render();
