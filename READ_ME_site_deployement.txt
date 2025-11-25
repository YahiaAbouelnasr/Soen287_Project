Terminal commands for firebase website deployment (avoid cors!)

TESTING WEBSITES (LOADS ON REFRESH) * USE THIS EVERYONE!!!
> % firebase serve --host 0.0.0.0 

FIREBASE DEPLOYEMENT (DOES NOT LOAD ON REFRESH - BRINGS THE WEBSITE / ANY CHANGES **LIVE!!**) * USE THIS ONLY IN THE END
> % firebase deploy

The firebase init hosting command initializes your current local directory for Firebase Hosting, 
linking it to a Firebase project and creating essential configuration files (firebase.json, .firebaserc) 
and a designated public folder (default: public) for your website's static files (HTML, CSS, JS). 

TLDR; SETS UP FIREBASE WEBSITE FOR FUTURE DEPLOYEMENT * don't use this (already setup)
> % firebase init hosting     
