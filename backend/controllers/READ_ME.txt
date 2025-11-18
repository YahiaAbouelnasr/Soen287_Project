TLDR of Controllers [ROUTE HANDLERS/FUNCTIONS]: 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Controllers = “what to do when we get there”

(Contains the actual logic)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Longer explanation (but simple):

📁 controllers/ ----> These files do the real work:
- read data from the request
- check inputs
- talk to the database
- send a response back

Example in controllers/usersController.js:

exports.loginUser = (req, res) => {
  // validate username/password
  // check database
  // send response
};

NO ROUTING HERE.
Just pure functions.