ROUTES --> MODULES EACH OF YOU WILL BE WORKING ON SEPERATELY


These are to delete after, def'n pulled from gpt:

This folder contains the route definitions (sometimes called routers).

Each file defines URL paths and HTTP methods (GET, POST, PUT, DELETE). For example users.js might define:
router.get('/', userController.list), router.post('/', userController.create).

Routes map paths to controller functions.

“A route is a section of Express code that associates an HTTP verb (GET, POST …), a URL path/pattern,
 and a function that is called to handle that pattern.” 

Keeping routes in their own folder helps when your backend grows (so you don’t have one big file with thousands of endpoints). 


~~~ Another explanation: ~~~
Purpose: Routes are like the traffic cops of your app. They decide where each incoming request should go.
A route defines an endpoint (URL path and HTTP method) and tells the app which code should run for that endpoint.

What’s Inside: This folder contains files that each group related routes. 
For example, you might have userRoutes.js for user-related URLs or blogRoutes.js for blog post URLs.
Inside, you use Express to map HTTP requests (GET, POST, PUT, DELETE, etc.) to controller functions. 
In short, each route file lists URL paths and which controller to call for each path.

Example: Suppose you have a route for users. 
In routes/userRoutes.js, there might be a line to handle GET requests for /users by calling a function getAllUsers in the controllers. 
So if someone visits /users, the route will forward that request to the appropriate controller. 
Similarly, a POST /login route would send the login request to a controller that handles sign-in logic.