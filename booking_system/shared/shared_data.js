
import { database } from '../../firebase.js';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// Firestore collection for bookings
const bookingsCol = collection(database, 'bookings');

const RESOURCES_KEY = 'campus_resources_v1';

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

function genId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}

(function ensureResourceIds() {
  const list = read(RESOURCES_KEY);
  if (!Array.isArray(list) || list.length === 0) return;

  let changed = false;
  for (const r of list) {
    if (!r.id || typeof r.id !== 'string' || !r.id.trim()) {
      r.id = genId();
      changed = true;
    }
  }

  if (changed) write(RESOURCES_KEY, list);
})();
/* test
(function ensureTestResource() {
  const list = read(RESOURCES_KEY);

  if (list.length === 0) {
    const testResource = {
      id: genId(),
      name: "Test Room A",
      type: "Room",
      capacity: 4,
      location: "Building A",
      notes: "Temporary test resource"
    };

    list.push(testResource);
    saveResources(list);
    console.log("✔ Test resource inserted");
  }
})();*/

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
    id: genId(),
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


export function clearResources() {
  localStorage.removeItem(RESOURCES_KEY);
}

//firsetore booking export
export async function getBookings() {
  const snap = await getDocs(bookingsCol);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}


export async function getBookingsForDay(resourceId, yyyyMmDd) {
  const q = query(
    bookingsCol,
    where('resourceId', '==', resourceId),
    where('date', '==', yyyyMmDd)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}


export async function addBooking(booking) {
  const docRef = await addDoc(bookingsCol, booking);
  return { id: docRef.id, ...booking };
}


export async function deleteBooking(id) {
  const ref = doc(database, 'bookings', id);
  await deleteDoc(ref);
}


