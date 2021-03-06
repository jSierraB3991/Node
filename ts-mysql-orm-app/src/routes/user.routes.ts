import { Router } from "express";
import { getUsers, createUser, getUserById, updateUser, deleteUserById } from "../controller/user.controller";

const router = Router();

router.get('/api/user', getUsers);
router.get('/api/user/:id', getUserById);
router.post('/api/user', createUser);
router.put('/api/user/:id', updateUser);
router.delete('/api/user/:id', deleteUserById);

export default router;