import express from 'express';
// Load express (the backend framework)
import { json } from 'express';

import cors from 'cors';
// Load CORS so frontend can talk to backend 
// - The install of cors fixes errors like when frontend runs on port 5500 and backend runs on port 3000
// - Without cors, request blocked. With it, everything works.

// Import all routes files
import usersRouter from './routes/users.js';
import dashboardsRouter from './routes/dashboards.js';
import bookingsRouter from './routes/bookings.js';
import resourcesRouter from './routes/resources.js';
// Loads the file (i.e. brings the code so you can attach it later)

const app = express();
// Create your backend app. 
const PORT = 3000;
// Backend will run on this port.

app.use(cors());
// Allow requests from your frontend.
app.use(json());
// Automatically read JSON sent in requests.
// Lets read objects (i.e. frontend sends "{"username":"ana","password":"1234"}" <- String)
// (i.e. express.json() converts it to { username: "ana", password: "1234" } <- REAL js object)

app.use('/api/users', usersRouter);
app.use('/api/dashboards', dashboardsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/resources', resourcesRouter);
// app.use i.e. users "Every route defined inside usersRouter should start with /api/users."
// so if your users has:
// router.get('/profile', ...) the real URL becomes: GET  /api/users/profile
// router.post('/login', ...) the real URL becomes: POST /api/users/login
// so app.use vs import: 
// import = get the file.
// app.use = activate the file at a URL path.

app.get('/', (req, res) => {
    res.send('Backend is working :)')
})  // Create a test route at / that returns text

app.listen(
    PORT,
    () => console.log(`its alive on http://localhost:${PORT}`)
);
// starts the app


/*
 * This is your “main” server file (or one of them)
 *
 * Purpose: This is the main file that starts your Express app. 
 * It contains the core setup for your application (creating the Express app, defining settings, etc.)
 * 
 * This file starts your server (e.g., const app = express(); app.listen(…))
 * It sets up global middleware (body-parser, CORS, static files, error handlers)
 * It connects your route modules to paths (e.g., app.use('/api/users', userRoutes))
 * Think of it as the “entry point” or “hub” of backend logic.
 *      
 * What’s Inside: Code to initialize the server and connect all the parts of your app. 
 * For example, it may load your route files and apply any general settings (like enabling JSON parsing or connecting to a database). 
 * It often ends by starting the server (e.g. calling app.listen(3000) to listen on a port).
 * 
 * Example: In app.js you might see something like app.use('/api', userRoutes), 
 * which tells Express to use the routes defined in userRoutes for any request that starts with /api. 
 * This is how app.js “wires up” the routes. 
 * 
 * Finally, app.js would start the server, so when a user signs in or a blog post is saved, 
 * the app is already listening for that request and knows which route/controller should handle it.
 */
