TLDR: Middleware does something (a function(s)) before accessing our modules (our OTHER functions) 
(i.e. blocks any actions until: correct login --> brings to dashboards)
(i.e. can also: function that blocks user after number of login attempts)

👉 You use next() only in middleware, not in simple GET/POST controllers.

TLDR; you do NOT use next() in controllers (or any other files unless maybe in routes)

[Example ~ when looking up req/res/next when using get/post/etc]:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Request 
   ↓
[ Middleware #1 ]   → uses next()
   ↓
[ Middleware #2 ]   → uses next()
   ↓
[ FINAL Controller ] → DOES NOT use next()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Meaning of req/res/next (req & res only ---> used for most of your backend)
-------------------------------------------------------------
|   Name   |                    Meaning                     |
| -------- | ---------------------------------------------- |
|   req    | incoming request from client                   |
|   res    | response you send back                         |
|   next   | function to move to next middleware or handler |
-------------------------------------------------------------

If you want to know WHERE to put your middleware:
----------------------------------------------------------------------------------------------------
|              Type              |      Where it goes     |                Example                 |
| ------------------------------ | ---------------------- | -------------------------------------- |
|       Global middleware        |        /app.js         | express.json(), cors(), global logging |
|   Route-specific middleware    | inside the router file |    verifyToken only for `/resources`   |
|   Reusable custom middleware   |   /middleware folder   |          logger.js, auth.js            |
----------------------------------------------------------------------------------------------------

➡️ Use a simple middleware file for auth. (which we can ALL use @Yahia to block users from entering any page)
- If your whole app is private (a.k.a login needed to do anything) → use GLOBAL auth middleware. 
    - REUSABLE IS NOT NEEDED THUS FAR (a.k.a 🚫 middleware folder)