import express from 'express';
import { register, login, logout,checkUserLoggedIn } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/checkuser', checkUserLoggedIn);

export default router;
