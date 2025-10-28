import { getResources } from "../shared/js/shared_data.js";
import { renderResourcesTable } from "../shared/js/shared_ui.js";

const tbody = document.getElementById("resourcesTbody");

function render() {
  renderResourcesTable(tbody, getResources());
}

render();
