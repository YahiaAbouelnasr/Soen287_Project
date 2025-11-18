ROUTES, CONTROLLERS, MODELS --> MODULES EACH OF YOU WILL BE WORKING ON SEPERATELY 
P.S. modules are in EVERY folder (EX: routes -> resources.js, models -> resource.js, controllers -> resourceController.js)

TLDR of routes [ROUTING]: 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Routes = “what URL goes where”

(Defines the endpoints)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Longer explanation (but simple):

📁 routes/ ---> These files ONLY decide:
- what is the URL?
- what method? (GET, POST, PUT…)
- which controller function runs?

Example in routes/users.js:

    router.post('/login', loginUser);
    outer.get('/profile', getUserProfile);

NO BUSINESS LOGIC HERE.
Just matching URL → controller function.

* Check controller READ_ME next