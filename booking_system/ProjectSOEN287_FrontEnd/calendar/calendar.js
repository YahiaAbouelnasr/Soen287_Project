import { getResources, getBookings } from '../shared/shared_data.js';


const SLOT_MIN = 30;
const START_HOUR = 8;
const END_HOUR = 22;
const ROWS = ((END_HOUR - START_HOUR) * 60) / SLOT_MIN;

const selResource = document.getElementById('resourceId');
const anyDay = document.getElementById('anyDay');
const grid = document.getElementById('grid');
const weekHeader = document.getElementById('weekHeader');


const pad = n => String(n).padStart(2, '0');
const toISODate = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

function mondayOf(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0,0,0,0);
  return d;
}
function addDays(date, n) { const d = new Date(date); d.setDate(d.getDate() + n); return d; }
function timeToIndex(hhmm){ const [h,m]=hhmm.split(':').map(Number); return Math.max(0,Math.floor(((h*60+m)-(START_HOUR*60))/SLOT_MIN)); }
function indexToTime(idx){ const minutes=START_HOUR*60+idx*SLOT_MIN; const h=Math.floor(minutes/60); const m=minutes%60; return `${pad(h)}:${pad(m)}`; }

function fillResourceOptions() {
  selResource.innerHTML = '';
  const resources = getResources();
  if (resources.length === 0) {
    const opt = document.createElement('option');
    opt.textContent = '— No resources yet —';
    selResource.appendChild(opt);
    return;
  }
  for (const r of resources) {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.textContent = `${r.name} (${r.type})`;
    selResource.appendChild(opt);
  }
}

function renderHeader(monday) {
  weekHeader.innerHTML = '';
  const first = document.createElement('div');
  first.className = 'cell';
  first.textContent = 'Time';
  weekHeader.appendChild(first);
  for (let d = 0; d < 7; d++) {
    const day = addDays(monday, d);
    const title = day.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    const div = document.createElement('div');
    div.className = 'cell';
    div.textContent = title;
    weekHeader.appendChild(div);
  }
}

function renderWeek() {
  const resources = getResources();
  const resourceId = selResource.value || (resources[0]?.id ?? '');
  const monday = mondayOf(anyDay.value ? new Date(anyDay.value) : new Date());
  renderHeader(monday);
  grid.innerHTML = '';
  grid.style.gridTemplateRows = `repeat(${ROWS}, auto)`;

  const allBookings = getBookings().filter(b => b.resourceId === resourceId);
  const byDate = new Map();
  for (const b of allBookings) {
    if (!byDate.has(b.date)) byDate.set(b.date, []);
    byDate.get(b.date).push(b);
  }

  for (let r = 0; r < ROWS; r++) {
    const timeCell = document.createElement('div');
    timeCell.className = 'cell time';
    timeCell.textContent = indexToTime(r);
    grid.appendChild(timeCell);

    for (let d = 0; d < 7; d++) {
      const day = addDays(monday, d);
      const iso = toISODate(day);
      const cell = document.createElement('div');
      cell.className = 'cell free';
      const dayBookings = byDate.get(iso) || [];
      let hit = null;
      for (const bk of dayBookings) {
        const s = timeToIndex(bk.start), e = timeToIndex(bk.end);
        if (r >= s && r < e) { hit = bk; break; }
      }
      if (hit) {
        cell.classList.replace('free','booked');
        cell.innerHTML = `<span class="tag">Booked</span> ${hit.who ?? ''} – ${hit.purpose ?? ''}`;
      }
      grid.appendChild(cell);
    }
  }
}

selResource.addEventListener('change', renderWeek);
anyDay.addEventListener('change', renderWeek);

(function init() {
  fillResourceOptions();
  const monday = mondayOf(new Date());
  anyDay.value = toISODate(monday);
  renderWeek();
})();
