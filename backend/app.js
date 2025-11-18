// For more def'n go to readme (deleted most comments here)
import express from 'express';
import { json } from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import dashboardsRouter from './routes/dashboards.js';
import bookingsRouter from './routes/bookings.js';
import resourcesRouter from './routes/resources.js';

const app = express(); 
const PORT = 3000;

app.use(cors());
app.use(json());

app.use('/api/users', usersRouter);
app.use('/api/dashboards', dashboardsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/resources', resourcesRouter);
// app.use i.e. users "Every route defined inside usersRouter should start with /api/users."

app.get('/', (req, res) => {
    res.send('Backend is working :)')
})  // Create a test route at / that returns text

app.listen(
    PORT,
    () => console.log(`its alive on http://localhost:${PORT}`)
); // starts the app


// This is your “main” server file
 
