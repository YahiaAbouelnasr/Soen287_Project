import { Router } from 'express';
import { getAllUsers } from '../controllers/userController.js';

const usersRouter = Router()

usersRouter.get('/', getAllUsers);

export default usersRouter;


