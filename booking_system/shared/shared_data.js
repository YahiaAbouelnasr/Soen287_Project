
import { database } from "/firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";



const resourcesCol = collection(database, "resources");

export async function getResourcesFromDB() {
  const snap = await getDocs(resourcesCol);
  return snap.docs.map(d => {
    const data = d.data();
    return {
      id: d.id,//firestore id
      name: data.name ?? "",
      type: data.type ?? "",
      capacity: data.capacity ?? "",
      location: data.location ?? "",
      notes: data.description ?? "",
      availability: data.availability ?? "",
      image: data.image ?? ""
    };
  });
}


const bookingsCol = collection(database, "bookings");

export async function getBookings() {
  const snap = await getDocs(bookingsCol);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getBookingsForDay(resourceId, yyyyMmDd) {
  const q = query(
    bookingsCol,
    where("resourceId", "==", resourceId),
    where("date", "==", yyyyMmDd)
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addBooking(booking) {
  const docRef = await addDoc(bookingsCol, booking);
  return { id: docRef.id, ...booking };
}

export async function deleteBooking(id) {
  const ref = doc(database, "bookings", id);
  await deleteDoc(ref);
}
