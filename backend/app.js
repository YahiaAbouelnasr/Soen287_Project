








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

