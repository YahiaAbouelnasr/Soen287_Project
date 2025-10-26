// shared/shared_data.js
// Single source of truth for localStorage + simple CRUD with safe IDs

const RESOURCES_KEY = 'campus_resources_v1';
const BOOKINGS_KEY  = 'campus_bookings_v1';

// ---------- Utilities ----------
function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}
function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function genId(prefix = 'r') {
  // Always generate a stable unique id
  return (crypto?.randomUUID?.() ?? `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`);
}

// ---------- One-time migration: ensure all saved resources have ids ----------
(function ensureResourceIds() {
  const list = read(RESOURCES_KEY);
  if (!Array.isArray(list) || list.length === 0) return;

  let changed = false;
  for (const r of list) {
    if (!r.id || typeof r.id !== 'string' || !r.id.trim()) {
      r.id = genId('r');
      changed = true;
    }
  }
  if (changed) write(RESOURCES_KEY, list);
})();

// ---------- Resources ----------
export function getResources() {
  return read(RESOURCES_KEY);
}

export function getResourceById(id) {
  return getResources().find(r => r.id === id) || null;
}

export function saveResources(list) {
  write(RESOURCES_KEY, list);
}

export function addResource(resource) {
  const list = getResources();

  const r = {
    id: genId('r'),
    name: (resource.name ?? '').trim(),
    type: (resource.type ?? '').trim(),
    capacity: Number(resource.capacity ?? 0),
    location: (resource.location ?? '').trim(),
    notes: (resource.notes ?? '').trim()
  };

  list.push(r);
  saveResources(list);
  return r;
}

export function updateResource(updated) {
  const list = getResources().map(r => (r.id === updated.id ? {
    ...r,
    name: (updated.name ?? r.name).trim(),
    type: (updated.type ?? r.type).trim(),
    capacity: Number(updated.capacity ?? r.capacity),
    location: (updated.location ?? r.location).trim(),
    notes: (updated.notes ?? r.notes).trim()
  } : r));
  saveResources(list);
}

export function deleteResourceById(id) {
  const list = getResources().filter(r => r.id !== id);
  saveResources(list);
}

// Optional helper if you want to completely clear resources:
export function clearResources() {
  localStorage.removeItem(RESOURCES_KEY);
}

// ---------- Bookings (kept so Person C pages work) ----------
export function getBookings() {
  return read(BOOKINGS_KEY);
}
export function saveBookings(list) {
  write(BOOKINGS_KEY, list);
}

// Tiny helper for calendar/day view
export function getBookingsForDay(resourceId, yyyyMmDd) {
  return getBookings().filter(b => b.resourceId === resourceId && b.date === yyyyMmDd);
}

// Optional: clear both stores (useful in dev)
export function clearAll() {
  localStorage.removeItem(RESOURCES_KEY);
  localStorage.removeItem(BOOKINGS_KEY);
}
