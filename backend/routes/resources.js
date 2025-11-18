import { Router } from 'express';

const resourcesRouter = Router()

resourcesRouter.get('/', () => {});

export default resourcesRouter;
/*
| Line                                  | Explanation                                                |
| ------------------------------------- | ---------------------------------------------------------- |
| `import { Router } from 'express'`    | Uses ES Modules to import the Router feature from Express. |
| `const resourcesRouter = Router()`    | Creates a mini Express app just for resource endpoints.    |
| `resourcesRouter.get('/', () => {});` | Defines a GET route at `/` (will become `/api/resources`). |
| `export default resourcesRouter`      | Makes this router available to other files like `app.js`.  |
*/



