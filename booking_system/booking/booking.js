import {
  getResources,
  getBookings,
  saveBookings,
} from "../../shared/js/shared_data.js";

const sel = document.getElementById("resourceId");
const msg = document.getElementById("msg");
const whoEl = document.getElementById("who");
const dateEl = document.getElementById("date");
const startEl = document.getElementById("start");
const endEl = document.getElementById("end");
const purposeEl = document.getElementById("purpose");
const saveBtn = document.getElementById("saveBtn");

function renderResources() {
  const resources = getResources();
  sel.innerHTML = "";

  if (!resources.length) {
    const opt = document.createElement("option");
    opt.value = "";
    opt.textContent = "No resources yet (create one first)";
    sel.appendChild(opt);
    sel.disabled = true;
    saveBtn.disabled = true;
    msg.textContent = "Go back and create a resource first.";
    return;
  }

  for (const r of resources) {
    const opt = document.createElement("option");
    opt.value = r.id;
    opt.textContent = r.name + " (" + (r.type || "resource") + ")";
    sel.appendChild(opt);
  }
  sel.disabled = false;
  saveBtn.disabled = false;
  msg.textContent = "";
}

renderResources();

function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function genBookingId() {
  return Date.now().toString() + Math.floor(Math.random() * 1000);
}

saveBtn.addEventListener("click", () => {
  msg.textContent = "";

  const who = whoEl.value.trim();
  const resourceId = sel.value;
  const date = dateEl.value;
  const start = startEl.value;
  const end = endEl.value;
  const purpose = purposeEl.value.trim();

  if (!resourceId) return (msg.textContent = "Please select a resource.");
  if (!who) return (msg.textContent = "Please enter your name.");
  if (!date) return (msg.textContent = "Please choose a date.");
  if (!start || !end)
    return (msg.textContent = "Please choose start and end time.");

  const startMin = timeToMinutes(start);
  const endMin = timeToMinutes(end);
  if (endMin <= startMin)
    return (msg.textContent = "End time must be after start time.");

  const list = getBookings();
  const sameDay = list.filter(
    (b) => b.resourceId === resourceId && b.date === date
  );
  const conflict = sameDay.some((b) => {
    const s = timeToMinutes(b.start);
    const e = timeToMinutes(b.end);
    return Math.max(s, startMin) < Math.min(e, endMin);
  });

  if (conflict) {
    msg.textContent = "That time conflicts with an existing booking.";
    return;
  }

  const booking = {
    id: genBookingId(),
    who,
    resourceId,
    date,
    start,
    end,
    purpose,
  };

  list.push(booking);
  saveBookings(list);
  msg.textContent = "Booking saved ✔";
});
