import "/userSafety.js";
import { auth } from '../../firebase.js';
import { getResourcesFromDB, getBookings, addBooking } from '../shared/shared_data.js';

const sel = document.getElementById('resourceId');
const msg = document.getElementById('msg');
const whoEl = document.getElementById('who');
const dateEl = document.getElementById('date');
const startEl = document.getElementById('start');
const endEl = document.getElementById('end');
const purposeEl = document.getElementById('purpose');
const saveBtn = document.getElementById('saveBtn');

async function renderResources() {
  sel.innerHTML = '';
  const resources = await getResourcesFromDB();

  if (!resources.length) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'No resources yet (create one first)';
    sel.appendChild(opt);
    sel.disabled = true;
    saveBtn.disabled = true;
    msg.textContent = 'Go back and create a resource first.';
    return;
  }

  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = '-- Select a Resource --';
  sel.appendChild(defaultOpt);

  for (const r of resources) {
    const opt = document.createElement('option');
    opt.value = r.id;
    opt.setAttribute('data-name', r.name); 
    opt.textContent = r.name + ' (' + (r.type || 'resource') + ')';
    sel.appendChild(opt);
  }
  sel.disabled = false;
  saveBtn.disabled = false;
  msg.textContent = '';
}

renderResources();

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

saveBtn.addEventListener('click', async () => {
  msg.textContent = '';

  const user = auth.currentUser;
  if (!user) {
      msg.textContent = "Error: You must be logged in to book.";
      return;
  }

  const who = whoEl.value.trim();
  const resourceId = sel.value;
  const date = dateEl.value;
  const start = startEl.value; 
  const end = endEl.value;     
  const purpose = purposeEl.value.trim();

  const selectedOption = sel.options[sel.selectedIndex];
  const resourceName = selectedOption ? selectedOption.getAttribute('data-name') : 'Unknown Resource';

  if (!resourceId) return msg.textContent = 'Please select a resource.';
  if (!who)       return msg.textContent = 'Please enter your name.';
  if (!date)      return msg.textContent = 'Please choose a date.';
  if (!start || !end) return msg.textContent = 'Please choose start and end time.';

  const startMin = timeToMinutes(start);
  const endMin   = timeToMinutes(end);
  if (endMin <= startMin) {
    msg.textContent = 'End time must be after start time.';
    return;
  }

  const list = await getBookings();
  
  const sameDay = list.filter(b => b.resourceId === resourceId && b.date === date && b.status !== 'rejected');
  const conflict = sameDay.some(b => {
    const s = timeToMinutes(b.start);
    const e = timeToMinutes(b.end);
    return Math.max(s, startMin) < Math.min(e, endMin);
  });

  if (conflict) {
    msg.textContent = 'That time conflicts with an existing booking.';
    return;
  }

  const booking = {
    userId: user.uid,
    userName: who, 
    
    resourceId,
    resourceName: resourceName, 
    
    date,
    start,
    end,
    purpose,
    status: 'pending',
    timestamp: new Date().toISOString()
  };

  await addBooking(booking);

  msg.textContent = 'Booking saved ✔ (pending approval)';
  
  whoEl.value = '';
  dateEl.value = '';
  startEl.value = '';
  endEl.value = '';
  purposeEl.value = '';
  sel.value = '';
});
