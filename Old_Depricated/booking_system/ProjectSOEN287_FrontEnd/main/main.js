
import { getResources } from '../shared/shared_data.js';
import { renderResourcesTable } from '../shared/shared_ui.js';

const tbody = document.getElementById('resourcesTbody');

function render() {
  renderResourcesTable(tbody, getResources());
}

render();
